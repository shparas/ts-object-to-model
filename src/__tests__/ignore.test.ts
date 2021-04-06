import { take } from '..';
import {
    TestNestedModel,
    TestModel,
    generateOriginalMethod,
    OptionalTestModel,
    OptionalWithValidatorTestModel,
    IgnoreTestModel,
    IgnoreWithValidatorTestModel,
} from './test-data';

test('Valid @ignore and take/map tester', () => {
    let originalModel = generateOriginalMethod();

    let expected = take(originalModel).mapToType(IgnoreTestModel);

    expect(expected.id).toBe(originalModel.id);
    expect(expected.hasAllLowerCase).toBe(undefined);
});

test('Valid @ignore and take/map tester with validator', () => {
    let originalModel = generateOriginalMethod();

    let expected = take(originalModel).mapToType(IgnoreWithValidatorTestModel);

    expect(expected.id).toBe(originalModel.id);
    expect(expected.hasAllLowerCase).toBe(undefined);

    originalModel.hasAllLowerCase = 'UPPER';

    expected = take(originalModel).mapToType(IgnoreWithValidatorTestModel);

    expect(expected.id).toBe(originalModel.id);
    expect(expected.hasAllLowerCase).toBe(originalModel.hasAllLowerCase);
});
