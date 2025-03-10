import { Schema } from "effect";
import * as Data from "./DataTagged.js";
import { plutus_tx } from "./plutus2.js";
import { aiken_plutus } from "./aiken-plutus.js";
import { aiken_plutus_2 } from "./aiken-plutus-2.js";
import { writeFileSync } from "fs";

const RefSchema = Schema.TemplateLiteral("#/definitions/", Schema.String);

type RefType = typeof RefSchema.Type;

const ByteArraySchema = Schema.Struct({
  dataType: Schema.Literal("bytes"),
  title: Schema.optional(Schema.String),
});

type ByteArrayType = typeof ByteArraySchema.Type;

const isByteArray = Schema.is(ByteArraySchema);

const IntSchema = Schema.Struct({
  title: Schema.optional(Schema.String),
  dataType: Schema.Literal("integer"),
});

type IntType = typeof IntSchema.Type;

const isInt = Schema.is(IntSchema);

const DataSchema = Schema.Union(
  Schema.Struct({
    title: Schema.Literal("Data"),
    description: Schema.String,
  })
);

type DataType = typeof DataSchema.Type;

const isData = Schema.is(DataSchema);

const FieldsSchema = Schema.Array(
  Schema.Struct({
    title: Schema.optional(Schema.String),
    $ref: RefSchema,
  })
);

type FieldsType = typeof FieldsSchema.Type;

const isFields = Schema.is(FieldsSchema);

const ConstructorSchema = Schema.Struct({
  dataType: Schema.Literal("constructor"),
  title: Schema.optional(Schema.String),
  index: Schema.Number,
  fields: FieldsSchema,
});

type ConstructorType = typeof ConstructorSchema.Type;

const isConstructor = Schema.is(ConstructorSchema);

const MapSchema = Schema.Struct({
  dataType: Schema.Literal("map"),
  keys: Schema.Any,
  values: Schema.Any,
});

type MapType = typeof MapSchema.Type;

const isMap = Schema.is(MapSchema);

const AnyOfSchema = Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  anyOf: Schema.Array(
    Schema.Union(ByteArraySchema, IntSchema, ConstructorSchema)
  ),
});

type AnyOfType = typeof AnyOfSchema.Type;

const isAnyOf = Schema.is(AnyOfSchema);

const OneOfSchema = Schema.Struct({
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  oneOf: Schema.Array(
    Schema.Union(ByteArraySchema, IntSchema, ConstructorSchema)
  ),
});
type OneOfType = typeof OneOfSchema.Type;

const isOneOf = Schema.is(OneOfSchema);

const EmptySchema = Schema.Struct({});

type EmptyType = typeof EmptySchema.Type;

const isEmpty = Schema.is(EmptySchema);

const CoreTypesSchema = Schema.Union(
  ByteArraySchema,
  IntSchema,
  DataSchema,
  ConstructorSchema,
  FieldsSchema,
  AnyOfSchema,
  MapSchema,
  OneOfSchema,
  EmptySchema
);
type CoreTypesType = typeof CoreTypesSchema.Type;

const DefinitionsSchema = Schema.Record({
  key: Schema.String,
  value: CoreTypesSchema,
});
type DefinitionsType = typeof DefinitionsSchema.Type;

const PreambleSchema = Schema.Struct({
  title: Schema.String,
  description: Schema.String,
  version: Schema.String,
  plutusVersion: Schema.String,
  license: Schema.String,
});
type PreambleType = typeof PreambleSchema.Type;

const ValidatorSchema = Schema.Struct({
  title: Schema.String,
  datum: Schema.optional(
    Schema.Struct({
      title: Schema.String,
      schema: Schema.Struct({
        $ref: RefSchema,
      }),
    })
  ),
  redeemer: Schema.Struct({
    title: Schema.optional(Schema.String),
    schema: Schema.Union(
      Schema.Struct({
        $ref: RefSchema,
      }),
      Schema.Struct({})
    ),
  }),
  parameters: Schema.optional(
    Schema.Array(
      Schema.Struct({
        title: Schema.String,
        schema: Schema.Struct({
          $ref: RefSchema,
        }),
      })
    )
  ),
  compiledCode: Schema.optional(Schema.String),
  hash: Schema.optional(Schema.String),
});
type ValidatorType = typeof ValidatorSchema.Type;

const ValidatorsSchema = Schema.Array(ValidatorSchema);
type ValidatorsType = typeof ValidatorsSchema.Type;

const PlutusJsonSchema = Schema.Struct({
  preamble: PreambleSchema,
  validators: ValidatorsSchema,
  definitions: DefinitionsSchema,
});

type PlutusJsonType = typeof PlutusJsonSchema.Type;

/**
 * Decodes a JSON Schema reference path by replacing URL encodings
 *
 * @example
 * import { decodeRefPath } from "experimental/ResolvePlutus";
 * decodeRefPath("#/definitions/cardano~1transaction~1OutputReference");
 * // Returns "#/definitions/cardano/transaction/OutputReference"
 *
 * @since 1.0.0
 */
const normalizeRefPath = (ref: string): string => {
  return ref.replace(/~1/g, "/");
};

/**
 * Resolves type name from a reference string
 *
 * @example
 * import { resolveRefName } from "experimental/ResolvePlutus";
 * resolveRefName("#/definitions/ByteArray"); // Returns "ByteArray"
 * resolveRefName("#/definitions/cardano~1transaction~1OutputReference");
 * // Returns "cardano/transaction/OutputReference"
 *
 * @since 1.0.0
 */
const resolveRefName = (ref: string): string => {
  const decodedRef = normalizeRefPath(ref);
  const parts = decodedRef.split("#/definitions/");
  return parts[1];
};

/**
 * Formats a definition name into a valid TypeScript type name
 *
 * @example
 * import { formatTypeName } from "experimental/ResolvePlutus";
 * formatTypeName("multi/Action"); // Returns "MultiAction"
 *
 * @since 1.0.0
 */
const formatTypeName = (name: string): string => {
  // Handle namespaced types (e.g., "multi/Action" -> "MultiAction")
  return name
    .split("/")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};

/**
 * Resolves a field type from a reference string using schema definitions
 *
 * @example
 * import { resolveFieldType } from "experimental/ResolvePlutus";
 * const fieldType = resolveFieldType("#/definitions/Int", schema.definitions);
 * console.log(fieldType); // Returns "Integer"
 * resolveFieldType("#/definitions/cardano~1transaction~1OutputReference", schemaDefs);
 * // Returns "CardanoTransactionOutputReference"
 *
 * @since 1.0.0
 */
const resolveFieldType = (ref: string): string => {
  const typeName = resolveRefName(ref);
  const formattedTypeName = formatTypeName(typeName);
  return formattedTypeName;
};

/**
 * Resolves a constructor type to a TypeScript type definition
 *
 * @example
 * import { resolveConstructorType } from "experimental/ResolvePlutus";
 * const typeDef = resolveConstructorType("OutputReference", constructorDef, schemaDefs);
 * console.log(typeDef);
 *
 * @since 1.0.0
 */
const resolveFields = (fields: FieldsType): string[] => {
  const fieldTypes: string[] = [];

  for (const field of fields) {
    const typeRef = getFieldTypeReference(field.$ref);
    fieldTypes.push(typeRef);
  }
  return fieldTypes;

  // const fieldsType =
  //   fieldTypes.length > 0 ? `[${fieldTypes.join(", ")}]` : "[]";
  // return `export type ${formatTypeName(name)} = Data.Constr<${def.index}n, ${fieldsType}>;`;
};

/**
 * Generates a variant type name from the parent type and variant name
 *
 * @example
 * import { generateVariantTypeName } from "experimental/ResolvePlutus";
 * generateVariantTypeName("Action", "Mint"); // Returns "ActionMint"
 *
 * @since 1.0.0
 */
const generateVariantTypeName = (
  parentTypeName: string,
  variantName: string
): string => {
  return `${formatTypeName(parentTypeName)}${variantName}`;
};

/**
 * Resolves a union type to a TypeScript type definition
 *
 * @example
 * import { resolveUnionType } from "experimental/ResolvePlutus";
 * const typeDef = resolveUnionType("Action", unionDef, schemaDefs);
 * console.log(typeDef);
 *
 * @since 1.0.0
 */
const resolveAnyOf = (name: string, def: AnyOfType): string => {
  // Handle singleton anyOf case
  if (def.anyOf.length === 1) {
    const variant = def.anyOf[0];
    if (variant.dataType === "constructor") {
      const fieldTypes: string[] = [];

      for (const field of variant.fields) {
        if ("$ref" in field && field.$ref) {
          fieldTypes.push(resolveFieldType(field.$ref));
        }
      }

      const fieldsType =
        fieldTypes.length > 0 ? `[${fieldTypes.join(", ")}]` : "[]";
      const t = `export type ${formatTypeName(name)} = Data.Constr<${variant.index}n, ${fieldsType}>;`;
      return t;
    }
    return "";
  }

  // Handle multiple variants case (unchanged)
  const formattedParentName = formatTypeName(name);
  const variants: string[] = [];
  const variantTypes: string[] = [];

  for (const variant of def.anyOf) {
    if (variant.dataType === "constructor") {
      const variantName = variant.title;
      const variantTypeName = generateVariantTypeName(
        formattedParentName,
        variantName || ""
      );
      variants.push(variantTypeName);

      const fieldTypes: string[] = [];

      if (variant.fields && variant.fields.length > 0) {
        for (const field of variant.fields) {
          if ("$ref" in field && field.$ref) {
            fieldTypes.push(resolveFieldType(field.$ref));
          }
        }
      }

      const fieldsType =
        fieldTypes.length > 0 ? `[${fieldTypes.join(", ")}]` : "[]";
      variantTypes.push(
        `export type ${variantTypeName} = Data.Constr<${variant.index}n, ${fieldsType}>;`
      );
    }
  }

  return [
    `export type ${formattedParentName} = ${variants.join(" | ")};`,
    ...variantTypes,
  ].join("\n");
};

/**
 * Gets the correct type reference for a field, handling both primitive and complex types
 */
const getFieldTypeReference = (ref: string): string => {
  const typeName = resolveRefName(ref);
  switch (typeName) {
    case "ByteArray":
      return "Data.ByteArray";
    case "Int":
      return "Data.Integer";
    case "Data":
      return "Data.Data";
    default:
      return formatTypeName(typeName);
  }
};

/**
 * Resolves a oneOf schema definition, which is structurally the same as anyOf
 *
 * @example
 * import { resolveOneOfType } from "experimental/ResolvePlutus";
 * const typeDef = resolveOneOfType("Action", oneOfDef, schemaDefs);
 * console.log(typeDef);
 *
 * @since 1.0.0
 */
const resolveOneOfType = (name: string, def: OneOfType): string => {
  // The implementation is identical to resolveUnionType, but works with oneOf instead of anyOf
  if (def.oneOf.length === 1) {
    const variant = def.oneOf[0];
    if (variant.dataType === "constructor") {
      const fieldTypes: string[] = [];

      if (variant.fields && variant.fields.length > 0) {
        for (const field of variant.fields) {
          if ("$ref" in field && field.$ref) {
            fieldTypes.push(getFieldTypeReference(field.$ref));
          }
        }
      }

      const fieldsType =
        fieldTypes.length > 0 ? `[${fieldTypes.join(", ")}]` : "[]";
      return `export type ${formatTypeName(name)} = Data.Constr<${variant.index}n, ${fieldsType}>;`;
    }
    return "";
  }

  // Multiple variants case
  const formattedParentName = formatTypeName(name);
  const variants: string[] = [];
  const variantTypes: string[] = [];

  for (const variant of def.oneOf) {
    if (variant.dataType === "constructor") {
      const variantName = variant.title || `Variant${variant.index}`;
      const variantTypeName = generateVariantTypeName(
        formattedParentName,
        variantName
      );
      variants.push(variantTypeName);

      const fieldTypes: string[] = [];

      if (variant.fields && variant.fields.length > 0) {
        for (const field of variant.fields) {
          if ("$ref" in field && field.$ref) {
            fieldTypes.push(getFieldTypeReference(field.$ref));
          }
        }
      }

      const fieldsType =
        fieldTypes.length > 0 ? `[${fieldTypes.join(", ")}]` : "[]";
      variantTypes.push(
        `export type ${variantTypeName} = Data.Constr<${variant.index}n, ${fieldsType}>;`
      );
    }
  }

  return [
    `export type ${formattedParentName} = ${variants.join(" | ")};`,
    ...variantTypes,
  ].join("\n");
};

/**
 * Resolves Plutus schema to TypeScript type definitions as a string
 *
 * @example
 * import { resolvePlutusToTypes } from "experimental/ResolvePlutus";
 * const typeString = resolvePlutusToTypes(plutus);
 * console.log(typeString);
 *
 * @since 1.0.0
 */
export const generateTypeDefinitions = (
  definitions: DefinitionsType
): string => {
  const typeDefinitions: string[] = [];

  // First process simple types
  for (const [name, def] of Object.entries(definitions)) {
    if (isByteArray(def)) {
      typeDefinitions.push(
        `export type ${formatTypeName(name)} = Data.ByteArray;`
      );
    } else if (isInt(def)) {
      typeDefinitions.push(
        `export type ${formatTypeName(name)} = Data.Integer;`
      );
    } else if (isData(def)) {
      typeDefinitions.push(`export type ${formatTypeName(name)} = Data.Data;`);
    } else if (isAnyOf(def)) {
      const resolvedType = resolveAnyOf(name, def );
      if (resolvedType) {
        typeDefinitions.push(resolvedType);
      }
    } else if (isOneOf(def)) {
      const resolvedType = resolveOneOfType(name, def);
      if (resolvedType) {
        typeDefinitions.push(resolvedType);
      }
    } else if (isConstructor(def)) {
      const resolvedType = resolveFields(def.fields);
      const fieldTypes =
        resolvedType.length > 0 ? `[${resolvedType.join(", ")}]` : "[]";
      typeDefinitions.push(
        `export type ${formatTypeName(name)} = Data.Constr<${def.index}n, ${fieldTypes}>;`
      );
    } else if (isMap(def)) {
      const typeName = formatTypeName(name);
      typeDefinitions.push(
        `export type ${typeName} = Data.Map<${resolveDefinitionTypes(def.keys)}, ${resolveDefinitionTypes(def.values)}>;`
      );
    }
    else {
      const typeName = formatTypeName(name);
      typeDefinitions.push(
        `export type ${typeName} = Data.Data;`
      );
    }
  }

  return typeDefinitions.join("\n\n");
};

export const resolveDefinitionTypes = (
  definition: DefinitionsType[string]
): string => {
  // First process simple types
  if (isByteArray(definition)) {
    return `Data.ByteArray`;
  } else if (isInt(definition)) {
    return `Data.Integer`;
  } else if (isData(definition)) {
    return `Data.Data`;
  } else if (isAnyOf(definition)) {
    const types = definition.anyOf.map((item) => resolveDefinitionTypes(item));
    return types.length > 1 ? types.join(" | ") : types[0] || "";
  } else if (isOneOf(definition)) {
    const types = definition.oneOf.map((item) => resolveDefinitionTypes(item));
    return types.length > 1 ? types.join(" | ") : types[0] || "";
  } else if (isConstructor(definition)) {
    const resolvedType = resolveFields(definition.fields);
    const fieldTypes =
      resolvedType.length > 0 ? `[${resolvedType.join(", ")}]` : "[]";
    return `Data.Constr<${definition.index}n, ${fieldTypes}>`;
  } else if (isMap(definition)) {
    return `Data.Map<${resolveDefinitionTypes(definition.keys)}, ${resolveDefinitionTypes(definition.values)}>`;
  } else if (isFields(definition)) {
    return definition.map((field) => resolveDefinitionTypes(field)).join(", ");
  } else if (isEmpty(definition)) {
    return `Data.Data`;
  }

  // Default return for any unhandled cases
  return `UnexpextedType`;
};

// Example usage
// const typeString = resolveDefinitionTypes(plutus.definitions);
// console.log(typeString);

/**
 * Interface for validator information
 */
interface ValidatorInfo {
  title: string;
  parameters: Array<{
    name: string;
    schema: { $ref: string }; // Changed to match the actual schema structure
  }>;
  datum?: {
    title?: string;
    schema: { $ref: string };
  };
  redeemer?: {
    title?: string;
    schema: { $ref: string };
  };
}

/**
 * Groups validators by their namespace
 */
interface ValidatorGroup {
  [namespace: string]: {
    [purpose: string]: ValidatorInfo;
  };
}

/**
 * Parses a validator title to extract namespace and purpose
 *
 * @example
 * import { parseValidatorTitle } from "experimental/ResolvePlutus";
 * parseValidatorTitle("multi.redeem.spend"); // Returns { namespace: "multi.redeem", purpose: "spend" }
 *
 * @since 1.0.0
 */
const parseValidatorTitle = (
  title: string
): { namespace: string; purpose: string } => {
  const parts = title.split(".");
  const purpose = parts.pop() || "";
  const namespace = parts.join(".");
  return { namespace, purpose };
};

/**
 * Resolves validators from Plutus schema
 *
 * @example
 * import { resolveValidators } from "experimental/ResolvePlutus";
 * const validators = resolveValidators(plutus);
 * console.log(validators);
 *
 * @since 1.0.0
 */
export const resolveValidators = (schema: PlutusJsonType): ValidatorGroup => {
  const validators: ValidatorGroup = {};

  if (!schema.validators) {
    return validators;
  }

  for (const validator of schema.validators) {
    const { namespace, purpose } = parseValidatorTitle(validator.title);

    if (!validators[namespace]) {
      validators[namespace] = {};
    }

    const parameters =
      validator.parameters?.map((param) => ({
        name: param.title || "unnamed",
        schema: param.schema,
      })) || [];

    const validatorInfo: ValidatorInfo = {
      title: validator.title,
      parameters,
      datum: validator.datum
        ? {
            title: validator.datum.title,
            schema: validator.datum.schema,
          }
        : undefined,
      redeemer:
        "$ref" in validator.redeemer.schema
          ? {
              title: validator.redeemer.title,
              schema: validator.redeemer.schema,
            }
          : undefined,
    };

    validators[namespace][purpose] = validatorInfo;
  }

  return validators;
};

/**
 * Generates TypeScript interfaces for validators
 *
 * @example
 * import { generateValidatorInterfaces } from "experimental/ResolvePlutus";
 * const interfaces = generateValidatorInterfaces(plutus);
 * console.log(interfaces);
 *
 * @since 1.0.0
 */
export const generateValidatorInterfaces = (schema: PlutusJsonType): string => {
  const validatorGroups = resolveValidators(schema);
  const interfaces: string[] = [];

  for (const [namespace, purposes] of Object.entries(validatorGroups)) {
    // Format the namespace name properly for TypeScript (PascalCase)
    const typeName = namespace
      .split(".")
      .map((part) => {
        // Handle underscore-separated parts like "gift_card" -> "GiftCard"
        return part
          .split("_")
          .map((subPart) => subPart.charAt(0).toUpperCase() + subPart.slice(1))
          .join("");
      })
      .join("");

    const fields: string[] = [];

    for (const [purpose, validator] of Object.entries(purposes)) {
      fields.push(`  ${purpose}: {`);

      // Add parameters as a record type
      fields.push(`    parameters: {`);
      if (validator.parameters.length > 0) {
        validator.parameters.forEach((param) => {
          if (param.schema && param.schema.$ref) {
            const paramType = formatTypeName(resolveRefName(param.schema.$ref));
            fields.push(`      ${param.name}: ${paramType};`);
          }
        });
      }
      fields.push(`    };`);

      // Add datum type if available
      if (validator.datum) {
        const datumType = formatTypeName(
          resolveRefName(validator.datum.schema.$ref)
        );
        fields.push(`    datum: ${datumType};`);
      }

      // Add redeemer type if available
      if (validator.redeemer) {
        const redeemerType = formatTypeName(
          resolveRefName(validator.redeemer.schema.$ref)
        );
        fields.push(`    redeemer: ${redeemerType};`);
      }

      fields.push(`  };`);
    }

    interfaces.push(`export type ${typeName} = {
${fields.join("\n")}
};`);
  }

  return interfaces.join("\n\n");
};

/**
 * Resolves Plutus schema to TypeScript definitions
 *
 * @example
 * import { resolvePlutusToTypescript } from "experimental/ResolvePlutus";
 * const typescript = resolvePlutusToTypescript(plutus);
 * console.log(typescript);
 *
 * @since 1.0.0
 */
export const resolvePlutusToTypescript = (schema: PlutusJsonType): string => {
  const typeDefinitions = generateTypeDefinitions(schema.definitions);
  const validatorInterfaces = generateValidatorInterfaces(schema);

  return `
// Types generated from Plutus schema
${typeDefinitions}

// Validator interfaces
${validatorInterfaces}
`;
};

// console.log(resolvePlutusToTypescript(plutus));

/**
 * Maps Plutus schema types to their corresponding TypeScript native types for parameters
 *
 * @example
 * import { mapToNativeType } from "experimental/ResolvePlutus";
 * mapToNativeType("ByteArray"); // Returns "string"
 *
 * @since 1.0.0
 */
const mapToNativeType = (schemaType: string): string => {
  // Map schema types to TypeScript native types
  switch (schemaType) {
    case "ByteArray":
      return "string";
    case "Int":
      return "bigint";
    case "Data":
      return "Data.Data";
    default:
      // For complex types, keep them as-is
      return formatTypeName(schemaType);
  }
};

/**
 * Determines if a type is a primitive type that needs conversion
 *
 * @example
 * import { isPrimitiveType } from "experimental/ResolvePlutus";
 * isPrimitiveType("ByteArray"); // Returns true
 * isPrimitiveType("ComplexType"); // Returns false
 *
 * @since 1.0.0
 */
const isPrimitiveType = (typeName: string): boolean => {
  return ["ByteArray", "Int", "Data"].includes(typeName);
};

/**
 * Generates TypeScript constructor functions for all types in the Plutus schema
 *
 * @example
 * import { generateTypeConstructors } from "experimental/ResolvePlutus";
 * const constructors = generateTypeConstructors(plutus);
 * console.log(constructors);
 *
 * @since 1.0.0
 */
export const generateTypeConstructors = (schema: PlutusJsonType): string => {
  const constructors: string[] = [];

  // Process all types, including primitives
  for (const [name, def] of Object.entries(schema.definitions)) {
    // Process primitive types
    if (isByteArray(def)) {
      constructors.push(
        `export const make${formatTypeName(name)} = (input: string): ${formatTypeName(name)} => Data.makeByteArray(input);`
      );
    } else if (isInt(def)) {
      constructors.push(
        `export const make${formatTypeName(name)} = (value: number | bigint): ${formatTypeName(name)} => Data.makeInteger(value);`
      );
    } else if (isData(def)) {
      constructors.push(
        `export const make${formatTypeName(name)} = (value: Data.Data): ${formatTypeName(name)} => value;`
      );
    } else if (isAnyOf(def)) {
      // Handle anyOf union types
      if (def.anyOf.length === 1) {
        const variant = def.anyOf[0];
        if (variant.dataType === "constructor") {
          constructors.push(generateSingleVariantConstructor(name, variant));
        }
      } else {
        for (const variant of def.anyOf) {
          if (variant.dataType === "constructor") {
            const variantName = variant.title || `Variant${variant.index}`;
            const variantTypeName = generateVariantTypeName(
              formatTypeName(name),
              variantName
            );
            constructors.push(
              generateVariantConstructor(name, variantTypeName, variant)
            );
          }
        }
      }
    } else if (isOneOf(def)) {
      // Handle oneOf union types - same logic as anyOf
      if (def.oneOf.length === 1) {
        const variant = def.oneOf[0];
        if (variant.dataType === "constructor") {
          constructors.push(generateSingleVariantConstructor(name, variant));
        }
      } else {
        for (const variant of def.oneOf) {
          if (variant.dataType === "constructor") {
            const variantName = variant.title || `Variant${variant.index}`;
            const variantTypeName = generateVariantTypeName(
              formatTypeName(name),
              variantName
            );
            constructors.push(
              generateVariantConstructor(name, variantName, variant)
            );
          }
        }
      }
    } else if (isConstructor(def)) {
      // Generate constructor for all constructor types
      constructors.push(generateConstructorTypeFunction(name, def));
    }
  }

  return constructors.join("\n");
};

/**
 * Generates a constructor function for a single variant in a union type
 */
const generateSingleVariantConstructor = (
  name: string,
  variant: any
): string => {
  const typeName = formatTypeName(name);
  const index = variant.index;
  const fieldParams: string[] = [];
  const fieldValues: string[] = [];

  if (variant.fields && variant.fields.length > 0) {
    variant.fields.forEach((field: any, i: number) => {
      const fieldName = field.title || `field${i}`;
      if (field.$ref) {
        const fieldRefType = resolveRefName(field.$ref);
        const fieldType = formatTypeName(fieldRefType);
        fieldParams.push(`${fieldName}: ${fieldType}`);

        if (isPrimitiveType(fieldRefType)) {
          fieldValues.push(`make${fieldType}(${fieldName})`);
        } else {
          fieldValues.push(fieldName);
        }
      }
    });
  }

  return `export const make${typeName} = (${fieldParams.length > 0 ? fieldParams.join(", ") : ""}): ${typeName} => Data.makeConstr(${index}n, [${fieldValues.join(", ")}]);`;
};

/**
 * Generates a constructor function for a variant in a multi-variant union type
 */
const generateVariantConstructor = (
  parentName: string,
  variantName: string,
  variant: any
): string => {
  const typeName = formatTypeName(parentName);
  const variantTypeName = generateVariantTypeName(typeName, variantName);
  const index = variant.index;
  const fieldParams: string[] = [];
  const fieldValues: string[] = [];

  if (variant.fields && variant.fields.length > 0) {
    variant.fields.forEach((field: any, i: number) => {
      const fieldName = field.title || `field${i}`;
      if (field.$ref) {
        const fieldRefType = resolveRefName(field.$ref);
        const fieldType = formatTypeName(fieldRefType);
        fieldParams.push(`${fieldName}: ${fieldType}`);

        if (isPrimitiveType(fieldRefType)) {
          fieldValues.push(`make${fieldType}(${fieldName})`);
        } else {
          fieldValues.push(fieldName);
        }
      }
    });
  }

  return `export const make${variantTypeName} = (${fieldParams.length > 0 ? fieldParams.join(", ") : ""}): ${variantTypeName} => Data.makeConstr(${index}n, [${fieldValues.join(", ")}]);`;
};

/**
 * Generates a constructor function for a standard constructor type
 */
const generateConstructorTypeFunction = (name: string, def: any): string => {
  const typeName = formatTypeName(name);
  const fieldParams: string[] = [];
  const fieldValues: string[] = [];

  if (def.fields && def.fields.length > 0) {
    def.fields.forEach((field: any, i: number) => {
      const fieldName = field.title || `field${i}`;
      if (field.$ref) {
        const fieldRefType = resolveRefName(field.$ref);
        const fieldType = formatTypeName(fieldRefType);
        fieldParams.push(`${fieldName}: ${fieldType}`);

        if (isPrimitiveType(fieldRefType)) {
          fieldValues.push(`make${fieldType}(${fieldName})`);
        } else {
          fieldValues.push(fieldName);
        }
      }
    });
  }

  return `export const make${typeName} = (${fieldParams.join(", ")}): ${typeName} => Data.makeConstr(0n, [${fieldValues.join(", ")}]);`;
};

/**
 * Resolves Plutus schema to TypeScript definitions with constructors
 *
 * @example
 * import { resolvePlutusToTypescriptWithConstructors } from "experimental/ResolvePlutus";
 * const typescript = resolvePlutusToTypescriptWithConstructors(plutus);
 * console.log(typescript);
 *
 * @since 1.0.0
 */
export const resolvePlutusToTypescriptWithConstructors = (
  schema: PlutusJsonType
): string => {
  const typeDefinitions = generateTypeDefinitions(schema.definitions);
  // const validatorInterfaces = generateValidatorInterfaces(schema);
  // const typeConstructors = generateTypeConstructors(schema);

  //   return `
  // // Types generated from Plutus schema
  // ${typeDefinitions}

  // // Validator interfaces
  // ${validatorInterfaces}

  // // Constructor functions for types
  // ${typeConstructors}
  // `;
  return `
// Types generated from Plutus schema
${typeDefinitions}
`;
};

// Write to file
const outputPath = "./generated-plutus-types.ts";
try {
  const p = Schema.decodeUnknownSync(PlutusJsonSchema)(plutus_tx);
  const typeDefinitions = resolvePlutusToTypescriptWithConstructors(p);
  writeFileSync(outputPath, typeDefinitions, "utf8");
  console.log(`Successfully wrote Plutus type definitions to ${outputPath}`);
} catch (error) {
  console.error(
    `Error writing to file: ${error instanceof Error ? error.message : String(error)}`
  );
}

// try {
//   const p = Schema.decodeUnknownSync(PlutusJsonSchema)(plutus_tx);
//   const typeDefinitions = resolvePlutusToTypescriptWithConstructors(p);
//   console.log(typeDefinitions);
// } catch (error) {
//   console.log(
//     `Error decoding Plutus schema: ${error instanceof Error ? error.message : String(error)}`
//   );
// }

/**
 * Export module functions
 */
export { normalizeRefPath as decodeRefPath, resolveRefName, formatTypeName };
