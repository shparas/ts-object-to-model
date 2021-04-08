import { getFieldDescriptor, isOptional, getValidators, isIgnored } from './decorators';
import { runValidations } from './utils';

export const Types = {
    string: 'string',
    number: 'number',
    integer: 'integer',
    boolean: 'boolean',
    array: 'array',
    object: 'object',
};

export const take = (obj: any): Mappable => {
    return new Mappable(obj);
};

class Mappable {
    private from: any;

    constructor(from: any) {
        this.from = from;
    }

    public mapToType<T>(C: new () => T, strict: boolean = true): T {
        const outputModel = new C();
        const from = this.from;

        for (const prop in outputModel) {
            // Make sure outputModel has the prop, else ignore mapping
            if (!Object.prototype.hasOwnProperty.call(outputModel, prop)) continue;

            // Retrieve field information
            const field = getFieldDescriptor(outputModel, prop);
            runValidations(from[field.sourceName], field.validators);

            // Ignore the map if property has 'ignore' decorator and its available validators passed
            if (isIgnored(outputModel, prop, from[field.sourceName])) continue;

            // Validate
            runValidations(from[field.sourceName], getValidators(outputModel, prop));

            // Map
            if (typeof field.destinationType === 'string') {
                // If type is defined as string, i.e. for basic type
                if (field.destinationType.toLowerCase() === Types.string) {
                    outputModel[prop] = from[field.sourceName].toString();
                } else if (field.destinationType.toLowerCase() === Types.integer) {
                    outputModel[prop] = parseInt(from[field.sourceName]) as any;
                } else if (field.destinationType.toLowerCase() === Types.number) {
                    outputModel[prop] = parseFloat(from[field.sourceName]) as any;
                } else if (field.destinationType.toLowerCase() === Types.boolean) {
                    outputModel[prop] = !!from[field.sourceName] as any;
                } else {
                    outputModel[prop] = from[field.sourceName];
                }
            } else {
                // If type is defined as object, i.e. for nested objects
                outputModel[prop] = from[field.sourceName]
                    ? take(from[field.sourceName]).mapToType(field.destinationType, strict)
                    : (undefined as any);
            }

            // Throw error if non-optionals are still strict and undefined with available validators passed
            if (strict && outputModel[prop] === undefined && !isOptional(outputModel, prop, from[field.sourceName])) {
                throw new Error(prop + ' value not provided.');
            }

            // Transform
            outputModel[prop] = field.transformer(outputModel[prop]);
        }

        return outputModel;
    }
}
