import 'reflect-metadata';

const metadataKey = Symbol('field');

interface IField {
    sourceName?: string;
    destinationType?: string | any;
    transformer?: { (value: any): any };
    validators?: { (value: any): boolean }[];
}

interface IFieldStrict {
    sourceName: string;
    destinationType: string | any;
    transformer: { (value: any): any };
    validators: { (value: any): boolean }[];
}

export function getFieldDescriptor(instance: any, propertyKey: string): IFieldStrict {
    let field: IFieldStrict = Reflect.getMetadata(metadataKey, instance, propertyKey);

    if (!field) {
        field = { sourceName: propertyKey, destinationType: '', transformer: (x) => x, validators: [] };
    } else {
        field.sourceName = field.sourceName ? field.sourceName : propertyKey;
        field.destinationType = field.destinationType ? field.destinationType : '';
        field.validators = field.validators ? field.validators : [];
        field.transformer = field.transformer ? field.transformer : (x) => x;
    }

    return field;
}

export function field(descriptor: IField) {
    return Reflect.metadata(metadataKey, descriptor);
}
