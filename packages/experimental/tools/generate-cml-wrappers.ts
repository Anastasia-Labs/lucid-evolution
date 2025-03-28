import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

/**
 * Configuration for generating Effect wrappers
 */
type Config = {
  sourceFile: string;
  outputDir: string;
  libraryImport: string;
  errorUtilPath: string;
  packageName: string;
  version: string;
};

/**
 * Parameter information
 */
type Parameter = {
  name: string;
  type: string;
};

/**
 * Processed parameter with original and processed names
 */
type ProcessedParameter = {
  originalName: string;
  name: string;
  type: string;
};

/**
 * Method information extracted from TypeScript declaration
 */
type MethodInfo = {
  name: string;
  parameters: Array<Parameter>;
  returnType: string;
  isStatic: boolean;
  description?: string;
};

/**
 * Class information with methods
 */
type ClassInfo = {
  name: string;
  methods: Array<MethodInfo>;
};

/**
 * Enum information with members
 */
type EnumInfo = {
  name: string;
  members: Array<string>;
};

/**
 * Function information extracted from TypeScript declaration
 */
type FunctionInfo = {
  name: string;
  parameters: Array<Parameter>;
  returnType: string;
  description?: string;
};

/**
 * Result of extraction from declaration file
 */
type Result = {
  classes: Array<ClassInfo>;
  enums: Array<EnumInfo>;
  functions: Array<FunctionInfo>;
};

/**
 * Extract information about classes, methods, enums and functions from a TypeScript declaration file
 */
const extractDeclarations = (filePath: string): Result => {
  console.log(`Extracting declarations from ${filePath}...`);
  const result: Result = {
    classes: [],
    enums: [],
    functions: [],
  };

  const fileContent = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true,
  );

  sourceFile.forEachChild((node) => {
    // Extract classes and their methods
    if (ts.isClassDeclaration(node) && node.name) {
      const className = node.name.text;
      const methods: MethodInfo[] = [];

      node.members.forEach((member) => {
        if (ts.isMethodDeclaration(member) && member.name) {
          const methodName = member.name.getText(sourceFile);
          const isStatic = Boolean(
            member.modifiers?.some(
              (m) => m.kind === ts.SyntaxKind.StaticKeyword,
            ),
          );
          const parameters = member.parameters
            .map((param) => {
              if (param.name && param.type) {
                return {
                  name: param.name.getText(sourceFile),
                  type: param.type.getText(sourceFile),
                };
              }
              return { name: "unknown", type: "unknown" };
            })
            .filter((p) => p.name !== "unknown");

          const returnType = member.type
            ? member.type.getText(sourceFile)
            : "void";

          methods.push({
            name: methodName,
            parameters,
            returnType,
            isStatic,
          });
        }
      });

      if (methods.length > 0) {
        result.classes.push({ name: className, methods });
      }
    }

    // Extract enums
    if (ts.isEnumDeclaration(node) && node.name) {
      const enumName = node.name.text;
      const members: string[] = [];

      node.members.forEach((member) => {
        if (member.name) {
          const memberName = member.name.getText(sourceFile);
          members.push(memberName);
        }
      });

      if (members.length > 0) {
        result.enums.push({ name: enumName, members });
      }
    }

    // Extract global functions
    if (ts.isFunctionDeclaration(node) && node.name) {
      const functionName = node.name.text;
      const parameters = node.parameters
        .map((param) => {
          if (param.name && param.type) {
            return {
              name: param.name.getText(sourceFile),
              type: param.type.getText(sourceFile),
            };
          }
          return { name: "unknown", type: "unknown" };
        })
        .filter((p) => p.name !== "unknown");

      const returnType = node.type ? node.type.getText(sourceFile) : "void";

      result.functions.push({
        name: functionName,
        parameters,
        returnType,
      });
    }
  });

  return result;
};

/**
 * Process a return type to add CML namespace to custom types
 */
const processTypeName = (typeName: string): string => {
  // Handle primitive types and special types that should not be prefixed
  if (
    typeName === "void" ||
    typeName === "string" ||
    typeName === "number" ||
    typeName === "boolean" ||
    typeName === "undefined" ||
    typeName === "any" ||
    typeName === "bigint" ||
    typeName === "BigInt64Array" ||
    typeName === "BigUint64Array" ||
    typeName === "Uint8Array" ||
    typeName === "Uint16Array" ||
    typeName === "Uint32Array" ||
    typeName === "Int8Array" ||
    typeName === "Int16Array" ||
    typeName === "Int32Array" ||
    typeName === "Float32Array" ||
    typeName === "Float64Array" ||
    typeName.includes("Promise<") ||
    typeName.startsWith("Array<") ||
    typeName.startsWith("[") ||
    typeName.includes("=>")
  ) {
    return typeName;
  }

  // Handle union types
  if (typeName.includes("|")) {
    const parts = typeName.split("|").map((part) => part.trim());
    return parts.map((part) => processTypeName(part)).join(" | ");
  }

  // Handle generic types like Array<T>
  if (typeName.includes("<") && typeName.includes(">")) {
    const baseType = typeName.substring(0, typeName.indexOf("<"));
    const genericPart = typeName.substring(
      typeName.indexOf("<") + 1,
      typeName.lastIndexOf(">"),
    );

    // Process the generic parameters
    const processedGenericPart = processTypeName(genericPart);
    return `${baseType}<${processedGenericPart}>`;
  }

  // Add CML namespace to custom types
  return `CML.${typeName}`;
};

/**
 * Process parameter names to avoid reserved keywords and conflicts with function names
 */
const safeParamName = (name: string, methodName: string): string => {
  // List of JavaScript reserved keywords
  const reservedKeywords = [
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "null",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
  ];

  // Convert to camelCase first
  const camelCaseName = toCamelCase(name);

  // If the name is a reserved keyword or matches the method name, prefix it with underscore
  return reservedKeywords.includes(camelCaseName) ||
    camelCaseName === methodName
    ? `_${camelCaseName}`
    : camelCaseName;
};

/**
 * Process method names to avoid reserved keywords
 */
const safeMethodName = (name: string): string => {
  // List of JavaScript reserved keywords
  const reservedKeywords = [
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "null",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
  ];

  // If the name is a reserved keyword, prefix it with underscore
  return reservedKeywords.includes(name) ? `_${name}` : name;
};

/**
 * Convert snake_case to camelCase
 */
const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

/**
 * Process method names to make them safe and convert to camelCase
 */
const processMethodName = (name: string): string => {
  // Convert from snake_case to camelCase first
  const camelCaseName = toCamelCase(name);

  // Then make sure it doesn't conflict with reserved keywords
  return safeMethodName(camelCaseName);
};

/**
 * Process method names for unsafe variants (convert unsafe_name to unsafeName)
 */
const processUnsafeName = (name: string): string => {
  // First convert the base name to camelCase
  const camelCaseName = toCamelCase(name);

  // Then make sure it doesn't conflict with reserved keywords
  const safeName = safeMethodName(camelCaseName);

  // Format using unsafeXxx convention
  return `unsafe${safeName.charAt(0).toUpperCase()}${safeName.slice(1)}`;
};

/**
 * Generate contextual error messages based on method type and name
 */
const generateErrorMessage = (
  methodName: string,
  originalMethodName: string,
  parameters: Array<ProcessedParameter>,
  isStatic: boolean,
  className: string,
  returnType: string,
): string => {
  // Start with the operation context and add class name
  let message = `${className}.${methodName} failed `;

  // Add parameter information if any
  if (parameters.length > 0) {
    message += `with parameters: ${parameters
      .map((p) => {
        // Check if parameter type is a CML class (doesn't contain primitive type indicators)
        const isPotentialClass =
          !p.type.includes("|") &&
          ![
            "string",
            "number",
            "boolean",
            "void",
            "any",
            "bigint",
            "Array",
          ].some((t) => p.type.includes(t)) &&
          !p.type.startsWith("[") &&
          !p.type.includes("=>");

        // If it looks like a class, include the type name in the error
        return isPotentialClass
          ? `\${${p.name}} (${p.type.replace("CML.", "")})` // Remove CML. prefix for cleaner messages
          : `\${${p.name}}`;
      })
      .join(", ")}. `;
  }

  if (originalMethodName.startsWith("to_")) {
    const cleanReturnType = returnType.replace(/CML\./g, "");
    message += `${className} is not valid for ${cleanReturnType} conversion. `;
  }

  if (originalMethodName === "free") {
    message += `Hint: Check if you're calling free() more than once.`;
  } else if (originalMethodName.includes("json")) {
    message += `Hint: Validate your JSON structure.`;
  } else if (originalMethodName.includes("bytes")) {
    message += `Hint: Check byte length and encoding.`;
  } else if (originalMethodName.includes("cbor_hex")) {
    message += `Hint: Make sure it's a valid hex string representing CBOR data.`;
  } else if (originalMethodName.includes("hex")) {
    message += `Hint: Ensure hex string has valid characters and length.`;
  } else if (originalMethodName.includes("str")) {
    message += `Hint: Not all ${className} instances can be stringified.`;
  }

  return message;
};

/**
 * Generate contextual error messages for functions
 */
const generateFunctionErrorMessage = (
  functionName: string,
  parameters: Array<ProcessedParameter>,
): string => {
  // Start with the operation context
  let message = `${functionName} failed`;

  // Add parameter information if any
  if (parameters.length > 0) {
    message += ` with parameters: ${parameters
      .map((p) => {
        // Check if parameter type is likely a CML class
        const isPotentialClass =
          !p.type.includes("|") &&
          p.type.includes("CML.") &&
          ![
            "string",
            "number",
            "boolean",
            "void",
            "any",
            "bigint",
            "Array",
          ].some((t) => p.type.includes(t)) &&
          !p.type.startsWith("[") &&
          !p.type.includes("=>");

        // If it looks like a class, include the type name in the error instead of the value
        return isPotentialClass
          ? `${p.name} (${p.type.replace("CML.", "")} instance)` // Remove CML. prefix for cleaner messages
          : `\${${p.name}}`;
      })
      .join(", ")}`;
  }

  // Add specific hints based on function name
  if (functionName.includes("json")) {
    message += `. Hint: Validate your JSON structure.`;
  } else if (functionName.includes("bytes")) {
    message += `. Hint: Check byte length and encoding.`;
  } else if (functionName.includes("cbor_hex")) {
    message += `. Hint: Make sure it's a valid hex string representing CBOR data.`;
  } else if (functionName.includes("hex")) {
    message += `. Hint: Ensure hex string has valid characters and length.`;
  } else if (functionName.includes("hash")) {
    message += `. Hint: Verify input data is valid for hashing.`;
  } else if (functionName.includes("parse")) {
    message += `. Hint: Check that input format is correct.`;
  } else if (
    functionName.includes("encode") ||
    functionName.includes("decode")
  ) {
    message += `. Hint: Verify encoding/decoding format compatibility.`;
  } else {
    message += `.`;
  }

  return message;
};

/**
 * Generate wrapper code for a class
 */
const generateWrapper = (classInfo: ClassInfo, config: Config): string => {
  const { name: className } = classInfo;

  // Updated imports to import the entire library with a namespace
  const imports = `import { Data, Effect } from "effect";
import * as CML from "${config.libraryImport}";`;

  // Export type alias for the CML class
  const typeExport = `export type ${className} = CML.${className};`;

  // Generate error class
  const errorClass = `export class ${className}Error extends Data.TaggedError("${className}Error")<{
  message?: string;
}> {}`;

  // Generate method wrappers
  const methodWrappers = classInfo.methods
    .map((method) => {
      const {
        name: originalMethodName,
        parameters,
        returnType,
        isStatic,
      } = method;

      // Use safe method name to avoid reserved keywords and convert to camelCase
      const name = processMethodName(originalMethodName);

      // Create proper unsafeName in camelCase format (unsafeMethodName)
      const unsafeName = processUnsafeName(originalMethodName);

      // Add CML namespace to the return type
      const processedReturnType = processTypeName(returnType);

      // Process parameter types to add CML namespace and ensure safe names
      // Now passing the method name to ensure no conflicts
      const processedParameters = parameters.map((p) => ({
        originalName: p.name,
        name: safeParamName(p.name, name),
        type: processTypeName(p.type),
      }));

      // Instance variable placeholder for non-static methods
      const instanceExample = !isStatic
        ? `// Assume we have a ${className} instance
 * const instance = ... ;`
        : "";

      // Use parameter name as placeholder instead of trying to guess values
      const paramPlaceholders = processedParameters
        .map((p) => p.name)
        .join(", ");

      // Improved JSDoc with realistic examples for effect-based function
      const jsDoc = `/**
 * ${isStatic ? `Static method ${name} of ${className}` : `Method ${name} of ${className}`}
 * 
 * @example
 * import { ${className} } from "@${config.packageName}";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 * ${instanceExample}
 *   const result = yield* ${className}.${name}(${!isStatic ? "instance" : ""}${!isStatic && parameters.length ? ", " : ""}${parameters.length ? " parameters " : ""});
 *   console.log(result);
 * });
 * 
 * @since ${config.version}
 * @category ${isStatic ? "Constructors" : "Methods"}
 */`;

      // Improved JSDoc with realistic examples for unsafe function
      const unsafeJsDoc = `/**
 * Unsafely calls ${isStatic ? `${className}.${name}` : `instance.${name}`} without Effect wrapper
 * 
 * @example
 * import { ${className} } from "@${config.packageName}";
 * 
 * ${instanceExample}
 * 
 * // Using try/catch for error handling
 * try {
 *   const result = ${className}.${unsafeName}(${!isStatic ? "instance" : ""}${!isStatic && parameters.length ? ", " : ""}${parameters.length ? " parameters " : ""});
 *   console.log(result);
 * } catch (error) {
 *   console.error(\`${className}.${unsafeName} failed: \${error.message}\`);
 * }
 * 
 * @since ${config.version}
 * @category ${isStatic ? "Constructors" : "Methods"}
 */`;

      if (isStatic) {
        // Static method - updated with simpler error handling
        const paramsList = processedParameters
          .map((p) => `${p.name}: ${p.type}`)
          .join(", ");

        // Use original parameter names when calling the CML method
        const paramsCall = processedParameters.map((p) => p.name).join(", ");

        // Generate error message with class name and return type
        const errorMessage = generateErrorMessage(
          name,
          originalMethodName,
          processedParameters,
          true,
          className,
          processedReturnType,
        );

        return `${jsDoc}
export const ${name} = Effect.fn(function* (${paramsList}) {
  return yield* Effect.try({
    try: () => CML.${className}.${originalMethodName}(${paramsCall}),
    catch: () => new ${className}Error({
      message: \`${errorMessage}\`,
    }),
  });
});

${unsafeJsDoc}
export const ${unsafeName} = (${paramsList}) =>
  Effect.runSync(${name}(${processedParameters.map((p) => p.name).join(", ")}));`;
      } else {
        // Instance method - updated with simpler error handling
        const paramsList =
          parameters.length > 0
            ? `instance: CML.${className}, ${processedParameters
                .map((p) => `${p.name}: ${p.type}`)
                .join(", ")}`
            : `instance: CML.${className}`;

        // Use safe parameter names when calling the instance method
        const paramsCall = processedParameters.map((p) => p.name).join(", ");

        // Generate error message with class name and return type
        const errorMessage = generateErrorMessage(
          name,
          originalMethodName,
          processedParameters,
          false,
          className,
          processedReturnType,
        );

        // For instance methods, we need to create a function that calls the method on the instance
        return `${jsDoc}
export const ${name} = Effect.fn(
  (${paramsList}): Effect.Effect<${processedReturnType}, ${className}Error> =>
    Effect.try({
      try: () => instance.${originalMethodName}(${paramsCall}),
      catch: () =>
        new ${className}Error({
          message: \`${errorMessage}\`,
        }),
    })
);

${unsafeJsDoc}
export const ${unsafeName} = (${paramsList}): ${processedReturnType} =>
  Effect.runSync(${name}(instance${
    parameters.length ? ", " : ""
  }${processedParameters.map((p) => p.name).join(", ")}));`;
      }
    })
    .join("\n\n");

  return `${imports}\n\n${typeExport}\n\n${errorClass}\n\n${methodWrappers}\n`;
};

/**
 * Generate wrapper code for an enum
 */
const generateEnumWrapper = (enumInfo: EnumInfo, config: Config): string => {
  const { name: enumName, members } = enumInfo;

  // Create imports
  const imports = `import * as CML from "${config.libraryImport}";`;

  // Export enum type alias
  const typeExport = `export type ${enumName} = CML.${enumName};`;

  // Export enum values
  const membersExport = members
    .map((member) => `export const ${member} = CML.${enumName}.${member};`)
    .join("\n");

  // Create helper functions for string conversion if useful
  const helperFunctions = `
/**
 * Get all values of the ${enumName} enum
 * 
 * @example
 * import { ${enumName} } from "@${config.packageName}";
 * 
 * const allValues = ${enumName}.values();
 * console.log(allValues);
 * 
 * @since ${config.version}
 * @category Utils
 */
export const values = (): Array<CML.${enumName}> => [
  ${members.map((m) => `CML.${enumName}.${m}`).join(",\n  ")}
];

/**
 * Convert ${enumName} enum value to string
 * 
 * @example
 * import { ${enumName} } from "@${config.packageName}";
 * 
 * const name = ${enumName}.toString(CML.${enumName}.${members[0]});
 * console.log(name); // "${members[0]}"
 * 
 * @since ${config.version}
 * @category Utils
 */
export const toString = (value: CML.${enumName}): string => {
  switch (value) {
    ${members.map((m) => `case CML.${enumName}.${m}:\n      return "${m}";`).join("\n    ")}
    default:
      return "Unknown";
  }
};

/**
 * Convert string to ${enumName} enum value
 * 
 * @example
 * import { ${enumName} } from "@${config.packageName}";
 * 
 * const value = ${enumName}.fromString("${members[0]}");
 * console.log(value); // Some(CML.${enumName}.${members[0]})
 * 
 * @since ${config.version}
 * @category Utils
 */
export const fromString = (str: string): CML.${enumName} | undefined => {
  switch (str) {
    ${members.map((m) => `case "${m}":\n      return CML.${enumName}.${m};`).join("\n    ")}
    default:
      return undefined;
  }
};`;

  return `${imports}\n\n${typeExport}\n\n${membersExport}\n\n${helperFunctions}\n`;
};

/**
 * Generate wrapper code for a function
 */
const generateFunctionWrapper = (
  functionInfo: FunctionInfo,
  config: Config,
): string => {
  const { name: originalFunctionName, parameters, returnType } = functionInfo;

  // Use safe function name to avoid reserved keywords and convert to camelCase
  const name = processMethodName(originalFunctionName);

  // Create proper unsafeName in camelCase format (unsafeMethodName)
  const unsafeName = processUnsafeName(originalFunctionName);

  // Add CML namespace to the return type
  const processedReturnType = processTypeName(returnType);

  // Process parameter types to add CML namespace and ensure safe names
  const processedParameters = parameters.map((p) => ({
    originalName: p.name,
    name: safeParamName(p.name, name),
    type: processTypeName(p.type),
  }));

  // Parameter lists formatted for function declarations
  const paramsList = processedParameters
    .map((p) => `${p.name}: ${p.type}`)
    .join(", ");

  // Use parameter names when calling the original function
  const paramsCall = processedParameters.map((p) => p.name).join(", ");

  // Generate better error message for functions with class parameters
  const errorMessage = generateFunctionErrorMessage(
    originalFunctionName,
    processedParameters,
  );

  // Create function error type
  const errorClassName = `${name.charAt(0).toUpperCase() + name.slice(1)}Error`;

  // Create example parameter values for documentation based on parameter types
  const paramExamples = processedParameters.map((p) => {
    const paramType = p.type.toLowerCase();
    if (paramType.includes("string")) return `"example"`;
    if (paramType.includes("number")) return "42";
    if (paramType.includes("boolean")) return "true";
    if (paramType.includes("cml.")) {
      const typeName = p.type.replace("CML.", "");
      return `${typeName} instance `;
    }
    return " appropriate value ";
  });

  // JSDoc for Effect-based function with realistic parameters
  const jsDoc = `/**
 * Wrapper for the ${originalFunctionName} function
 * 
 * @example
 * import { ${name} } from "@${config.packageName}/CML/functions";
 * import { Effect } from "effect";
 * 
 * // Using Effect for safe execution with error handling
 * Effect.gen(function*() {
 *   const result = yield* ${name}(${parameters.length ? paramExamples.join(", ") : ""});
 *   console.log(result);
 * });
 * 
 * @since ${config.version}
 * @category Functions
 */`;

  // JSDoc for unsafe function variant with realistic parameters
  const unsafeJsDoc = `/**
 * Unsafely calls ${originalFunctionName} function without Effect wrapper
 * 
 * @example
 * import { ${unsafeName} } from "@${config.packageName}/CML/functions";
 * 
 * try {
 *   const result = ${unsafeName}(${parameters.length ? paramExamples.join(", ") : ""});
 *   console.log(result);
 * } catch (error) {
 *   console.error(\`${unsafeName} failed: \${error.message}\`);
 * }
 * 
 * @since ${config.version}
 * @category Functions
 */`;

  return `import { Data, Effect } from "effect";
import * as CML from "${config.libraryImport}";

export class ${errorClassName} extends Data.TaggedError("${errorClassName}")<{
  message?: string;
}> {}

${jsDoc}
export const ${name} = Effect.fn(function* (${paramsList}) {
  return yield* Effect.try({
    try: () => CML.${originalFunctionName}(${paramsCall}),
    catch: () => new ${errorClassName}({
      message: \`${errorMessage}\`,
    }),
  });
});

${unsafeJsDoc}
export const ${unsafeName} = (${paramsList}): ${processedReturnType} =>
  Effect.runSync(${name}(${processedParameters.map((p) => p.name).join(", ")}));
`;
};

/**
 * Creates index file for generated wrappers
 */
const createIndex = (
  classes: Array<ClassInfo>,
  enums: Array<EnumInfo>,
  outputDir: string,
): void => {
  const classExports = classes
    .map((cls) => `export * as ${cls.name} from './${cls.name}.js';`)
    .join("\n");

  // Update enum exports to point to the Enum subdirectory (PascalCase)
  const enumExports = enums
    .map((e) => `export * as ${e.name} from './Enum/${e.name}.js';`)
    .join("\n");

  const content = `// This file is auto-generated - do not modify
${classExports}

// Enums
${enumExports}
`;

  fs.writeFileSync(path.join(outputDir, "index.ts"), content);
};

/**
 * Creates index file for enum wrappers
 */
const createEnumsIndex = (enums: Array<EnumInfo>, outputDir: string): void => {
  const enumExports = enums
    .map((e) => `export * as ${e.name} from './${e.name}.js';`)
    .join("\n");

  const content = `// This file is auto-generated - do not modify
${enumExports}
`;

  fs.writeFileSync(path.join(outputDir, "index.ts"), content);
};

/**
 * Creates index file for function wrappers
 */
const createFunctionsIndex = (
  functions: Array<FunctionInfo>,
  outputDir: string,
): void => {
  // Group functions by first letter for better organization
  const functionsByLetter: Record<string, Array<string>> = {};

  functions.forEach((func) => {
    const firstLetter = func.name.charAt(0).toUpperCase();
    if (!functionsByLetter[firstLetter]) {
      functionsByLetter[firstLetter] = [];
    }
    functionsByLetter[firstLetter].push(func.name);
  });

  // Create exports organized by first letter
  const content = `// This file is auto-generated - do not modify
${Object.entries(functionsByLetter)
  .map(
    ([letter, funcs]) =>
      `// ${letter}\n${funcs.map((f) => `export * from './${f}.js';`).join("\n")}`,
  )
  .join("\n\n")}
`;

  fs.writeFileSync(path.join(outputDir, "index.ts"), content);
};

/**
 * Recursively deletes a directory and all its contents
 */
const deleteDirectory = (directoryPath: string): void => {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const currentPath = path.join(directoryPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        // Recursive call for subdirectories
        deleteDirectory(currentPath);
      } else {
        // Delete file
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(directoryPath);
    console.log(`Deleted directory: ${directoryPath}`);
  }
};

/**
 * Main function to generate all wrappers
 */
const generate = (config: Config): void => {
  console.log("Generating Effect wrappers...");

  // Delete the output directory if it exists to start fresh
  if (fs.existsSync(config.outputDir)) {
    console.log(`Cleaning up existing output directory: ${config.outputDir}`);
    deleteDirectory(config.outputDir);
  }

  // Ensure output directory exists
  fs.mkdirSync(config.outputDir, { recursive: true });

  // Ensure output directories for different types exist
  // Using PascalCase for "Enum" directory
  const enumsDir = path.join(config.outputDir, "Enum");
  const functionsDir = path.join(config.outputDir, "Utils");

  fs.mkdirSync(enumsDir, { recursive: true });
  fs.mkdirSync(functionsDir, { recursive: true });

  // Extract declarations from declaration file
  const { classes, enums, functions } = extractDeclarations(config.sourceFile);
  console.log(
    `Found ${classes.length} classes, ${enums.length} enums, and ${functions.length} functions to wrap`,
  );

  // Generate wrapper for each class
  for (const classInfo of classes) {
    const outputPath = path.join(config.outputDir, `${classInfo.name}.ts`);
    const wrapperCode = generateWrapper(classInfo, config);

    fs.writeFileSync(outputPath, wrapperCode);
    console.log(`Generated wrapper for ${classInfo.name}`);
  }

  // Generate wrapper for each enum in the Enum directory (PascalCase)
  for (const enumInfo of enums) {
    const outputPath = path.join(enumsDir, `${enumInfo.name}.ts`);
    const wrapperCode = generateEnumWrapper(enumInfo, config);

    fs.writeFileSync(outputPath, wrapperCode);
    console.log(`Generated wrapper for enum ${enumInfo.name}`);
  }

  // Generate wrapper for each function
  for (const functionInfo of functions) {
    const outputPath = path.join(functionsDir, `${functionInfo.name}.ts`);
    const wrapperCode = generateFunctionWrapper(functionInfo, config);

    fs.writeFileSync(outputPath, wrapperCode);
    console.log(`Generated wrapper for function ${functionInfo.name}`);
  }

  // Create index files
  createIndex(classes, enums, config.outputDir);

  // Create index file for enums directory
  if (enums.length > 0) {
    createEnumsIndex(enums, enumsDir);
  }

  // Create index file for functions directory
  if (functions.length > 0) {
    createFunctionsIndex(functions, functionsDir);

    // Update main index to export functions module
    const mainIndexPath = path.join(config.outputDir, "index.ts");
    const mainIndexContent = fs.readFileSync(mainIndexPath, "utf8");
    const updatedContent =
      mainIndexContent +
      "\n// Utils\nexport * as Utils from './Utils/index.js';\n";
    fs.writeFileSync(mainIndexPath, updatedContent);
  }

  console.log("Done generating wrappers!");
};

// Run the generator with version specified
generate({
  sourceFile:
    "./node_modules/@anastasia-labs/cardano-multiplatform-lib-nodejs/cardano_multiplatform_lib.d.ts",
  outputDir: "./src/CML",
  libraryImport: "@anastasia-labs/cardano-multiplatform-lib-nodejs",
  errorUtilPath: "../FormatError.js",
  packageName: "lucid-evolution/experimental",
  version: "2.0.0",
});
