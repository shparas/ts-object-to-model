import { take } from '..';
import { optional, field, ignore } from '..';

class TestModel {
    @field('_id', 'string')
    public id?: string = undefined;

    public firstname?: string = undefined;
    public lastname?: string = undefined;

    @optional
    public status?: string = undefined;

    @ignore()
    public expireTime: number = Date.now() + 3600 * 1000;
}

test('Take Tester', () => {
    let actual = {
        _id: 'myId',
        firstname: 'First',
        lastname: 'Last',

        status: 'active',
        expireTime: -1,
    };

    let expected = take(actual).mapToType(TestModel);

    expect(expected.id).toBe(actual._id);
    expect(expected.firstname).toBe(actual.firstname);
    expect(expected.lastname).toBe(actual.lastname);
    expect(expected.status).toBe(actual.status);
    expect(expected.expireTime).not.toBe(actual.expireTime);
});
