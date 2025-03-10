/**
 * Type definitions for ResolvePlutus module
 * 
 * @since 1.0.0
 */

/**
 * Represents a reference to a schema definition
 */
export type SchemaReference = `#/definitions/${string}`;

/**
 * Represents a ByteArray schema
 */
export type ByteArraySchema = {
  dataType: "bytes";
  title?: string;
};

/**
 * Represents an Integer schema
 */
export type IntegerSchema = {
  dataType: "integer";
};

/**
 * Represents a Data schema
 */
export type DataSchema = {
  title: "Data";
  description: string;
};

/**
 * Represents a field in a constructor
 */
export type ConstructorField = {
  title?: string;
  $ref?: SchemaReference;
};

/**
 * Represents a constructor schema
 */
export type ConstructorSchema = {
  title: string;
  dataType: "constructor";
  index: number;
  fields: ReadonlyArray<ConstructorField>;
};

/**
 * Represents a union type schema
 */
export type UnionSchema = {
  title: string;
  description?: string;
  anyOf: ReadonlyArray<ByteArraySchema | IntegerSchema | ConstructorSchema>;
};

/**
 * Core schema types
 */
export type CoreSchema = 
  | ByteArraySchema 
  | IntegerSchema 
  | DataSchema 
  | ConstructorSchema 
  | UnionSchema;

/**
 * Schema definitions mapping
 */
export type SchemaDefinitions = Record<string, CoreSchema>;

/**
 * Complete Plutus schema structure
 */
export type PlutusSchema = {
  preamble?: {
    title: string;
    description: string;
    version: string;
    plutusVersion: string;
    compiler: {
      name: string;
      version: string;
    };
    license: string;
  };
  validators: ReadonlyArray<{
    title: string;
    datum?: {
      title: string;
      schema: { $ref: SchemaReference }
    };
    redeemer: {
      title?: string;
      schema: { $ref: SchemaReference } | {}
    };
    parameters?: ReadonlyArray<{
      title: string;
      schema: { $ref: SchemaReference }
    }>;
    compiledCode: string;
    hash: string;
  }>;
  definitions: SchemaDefinitions;
};

/**
 * Resolves type name from a reference string
 * 
 * @example
 * import { resolveRefName } from "experimental";
 * resolveRefName("#/definitions/ByteArray"); // "ByteArray"
 * 
 * @since 1.0.0
 */
export type ResolveRefNameFn = (ref: string) => string;

/**
 * Formats a definition name into a valid TypeScript type name
 * 
 * @example
 * import { formatTypeName } from "experimental";
 * formatTypeName("multi/Action"); // "MultiAction"
 * 
 * @since 1.0.0
 */
export type FormatTypeNameFn = (name: string) => string;

/**
 * Resolves a constructor type to a TypeScript type definition
 * 
 * @example
 * import { resolveConstructorType } from "experimental";
 * resolveConstructorType("OutputReference", constructorDef); // "export type OutputReference = {...}"
 * 
 * @since 1.0.0
 */
export type ResolveConstructorTypeFn = (name: string, def: CoreSchema) => string;

/**
 * Resolves a union type to a TypeScript type definition
 * 
 * @example
 * import { resolveUnionType } from "experimental";
 * resolveUnionType("Action", unionDef); // "export type Action = {...} | {...}"
 * 
 * @since 1.0.0
 */
export type ResolveUnionTypeFn = (name: string, def: CoreSchema) => string;

/**
 * Resolves Plutus schema to TypeScript type definitions
 * 
 * @example
 * import { resolvePlutusToTypes } from "experimental";
 * const typeString = resolvePlutusToTypes(plutus);
 * console.log(typeString);
 * 
 * @since 1.0.0
 */
export type ResolvePlutusToTypesFn = (schema: PlutusSchema) => string;

/**
 * Complete interface for the ResolvePlutus module
 * 
 * @since 1.0.0
 */
export interface ResolvePlutusModule {
  resolveRefName: ResolveRefNameFn;
  formatTypeName: FormatTypeNameFn;
  resolveConstructorType: ResolveConstructorTypeFn;
  resolveUnionType: ResolveUnionTypeFn;
  resolvePlutusToTypes: ResolvePlutusToTypesFn;
}
