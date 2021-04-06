import 'reflect-metadata';
import { runValidations } from '../utils';

const metadataKey = Symbol('ignore');

interface IIgnore {
    ignore: boolean;
    validators: { (value: any): boolean }[];
}

export function isIgnored(instance: any, propertyKey: string, value: any): boolean {
    let ignorableObject: IIgnore = Reflect.getMetadata(metadataKey, instance, propertyKey);

    if (ignorableObject) return ignorableObject.ignore && runValidations(value, ignorableObject.validators, true);
    else return false;
}

export function ignore(validators: { (value: any): boolean }[] = []) {
    let ignorableObject: IIgnore = { ignore: true, validators: validators };

    return Reflect.metadata(metadataKey, ignorableObject);
}

/* For @ignore instead of @ignore() or @ignore([...])
export function ignore(instance: any, propertyKey: string) {
    Reflect.defineMetadata(metadataKey, true, instance, propertyKey);
}
*/
