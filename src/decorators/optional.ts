import 'reflect-metadata';
import { runValidations } from '../utils';

const metadataKey = Symbol('optional');

interface IOptional {
    optional: boolean;
    validators: { (value: any): boolean }[];
}

export function isOptional(instance: any, propertyKey: string, value: any): boolean {
    let optionalObject: IOptional = Reflect.getMetadata(metadataKey, instance, propertyKey);

    if (optionalObject) return optionalObject.optional && runValidations(value, optionalObject.validators, true);
    else return false;
}

export function optional(validators: { (value: any): boolean }[] = []) {
    let optionalObject: IOptional = { optional: true, validators: validators };

    return Reflect.metadata(metadataKey, optionalObject);
}

/* For @optional instead of @optional() or @optional([...])
export function ignore(instance: any, propertyKey: string) {
    Reflect.defineMetadata(metadataKey, true, instance, propertyKey);
}
*/
