import 'reflect-metadata';

// #region Optional decorator
const optionalMetadataKey = Symbol('optional');

export function isOptional(instance: any, propertyKey: string): boolean {
    return !!Reflect.getMetadata(optionalMetadataKey, instance, propertyKey);
}

export function optional(instance: any, propertyKey: string) {
    Reflect.defineMetadata(optionalMetadataKey, true, instance, propertyKey);
}
// #endregion

// #region Field Decorator
const fieldMetadataKey = Symbol('field');

export const Types = {
    String: 'string',
    Int: 'int',
    Float: 'float',
    Boolean: 'boolean',
    Object: 'object',
};

export function field(name?: string, type?: string) {
    return Reflect.metadata(fieldMetadataKey, { name, type });
}

export function getFieldName(instance: any, propertyKey: string): { name: string; type: string } {
    return Reflect.getMetadata(fieldMetadataKey, instance, propertyKey);
}
// #endregion

// #region  Ignore Decorator
const ignoreMetadataKey = Symbol('ignore');

export function ignore() {
    return Reflect.metadata(ignoreMetadataKey, true);
}

export function isIgnored(instance: any, propertyKey: string): boolean {
    if (Reflect.getMetadata(ignoreMetadataKey, instance, propertyKey) === true) {
        return true;
    } else {
        return false;
    }
}
// #endregion
