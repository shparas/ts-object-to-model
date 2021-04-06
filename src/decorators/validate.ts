import 'reflect-metadata';

const validateMetadataKey = Symbol('validate');

export function getValidators(instance: any, propertyKey: string): { (data: any): boolean }[] {
    return Reflect.getMetadata(validateMetadataKey, instance, propertyKey);
}

export function validate(validators?: { (data: any): boolean }[]) {
    return Reflect.metadata(validateMetadataKey, validators);
}
