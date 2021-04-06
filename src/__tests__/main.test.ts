import { field, take, optional, ignore } from '..';
import { validate } from '../decorators';

class TestModel {
    @field({ sourceName: '_id', destinationType: 'string' })
    public id?: string = undefined; // will be mapped from _id as a string type

    public firstname?: string = undefined; // if strict is true, throws error if not found in a source object
    public lastname?: string = undefined;

    @validate([(gender) => gender.toUpperCase() == 'M' || gender.toUpperCase() == 'F'])
    public gender?: string = undefined;

    @optional()
    public status?: string = undefined; // will not throw error if not found in a source object

    @ignore()
    public expireTime: number = Date.now() + 3600 * 1000; // will not be mapped
}

let mainFunction = () => {
    let randomObject = {
        _id: 'myId',
        firstname: 'First',
        lastname: 'Last',
        gender: 'm',
        status: 'active',
        expireTime: -1,
        someOtherProps: 'Will be ignored',
    };

    let properModel = take(randomObject).mapToType(TestModel); // mapToType(TestModel, false) for non-strict mapping (doesn't throws error if property not found in source object)

    console.log(JSON.stringify(properModel)); // {"id":"myId","firstname":"First","lastname":"Last","gender":"m","status":"active","expireTime":SOMENUMBER}
};

test('Main function runner', () => {
    expect(mainFunction).not.toThrow();
});
