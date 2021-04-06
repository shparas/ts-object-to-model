export function runValidations(value: any, funcs: { (value: any): boolean }[], supressError = false): boolean {
    if (!funcs || funcs.length === 0) return true;

    if (supressError) {
        return funcs.every((func) => !!func(value));
    } else {
        return funcs.every((func) => {
            if (!func(value)) throw new Error('Validation failed for value ' + value + ' on validator ' + func);
            else return true;
        });
    }
}
