import { isOptional, getFieldName, isIgnored } from './decorators';

export const safe = (value: any) => {
    return typeof value !== 'undefined' ? value : 'undefined';
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
            if (prop[0] !== '_' && Object.prototype.hasOwnProperty.call(outputModel, prop)) {
                // Ignore the map if property has 'ignore' decorator
                if (!isIgnored(outputModel, prop)) {
                    // Map if fieldname is provided
                    const field = getFieldName(outputModel, prop);

                    // If undefined, then ignore
                    if (from[field?.name] !== undefined || from[prop] !== undefined) {
                        if (field) {
                            if (field.type.toLowerCase() === 'string') {
                                outputModel[prop] = from[field.name].toString();
                            } else if (field.type.toLowerCase() === 'int') {
                                outputModel[prop] = parseInt(from[field.name]) as any;
                            } else if (field.type.toLowerCase() === 'float') {
                                outputModel[prop] = parseFloat(from[field.name]) as any;
                            } else if (field.type.toLowerCase() === 'boolean') {
                                outputModel[prop] =
                                    from[field.name] === 'true' ||
                                    from[field.name] === '1' ||
                                    from[field.name] === 1 ||
                                    from[field.name] === true
                                        ? true
                                        : (false as any);
                            } else {
                                outputModel[prop] = from[field.name];
                            }
                        } else {
                            outputModel[prop] = from[prop];
                        }
                    }

                    // Throw error if non-optionals are still strict and undefined
                    if (strict && outputModel[prop] === undefined && !isOptional(outputModel, prop)) {
                        throw new Error(prop + ' value not provided.');
                    }
                }
            }
        }

        return outputModel;
    }
}
