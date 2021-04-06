import { take } from '..';
import {
    TestNestedModel,
    TestModel,
    generateOriginalMethod,
    OptionalTestModel,
    OptionalWithValidatorTestModel,
    ValidateTestModel,
    EmptyValidateTestModel,
} from './test-data';

test('Valid @validate and take/map tester', () => {
    let originalModel = generateOriginalMethod();
    let expected = take(originalModel).mapToType(EmptyValidateTestModel);

    expect(expected.id).toBe(originalModel.id);
    expect(expected.hasAllLowerCase).toBe(originalModel.hasAllLowerCase);
});

test('Valid @validate and take/map tester with validator', () => {
    let originalModel = generateOriginalMethod();
    let expected = take(originalModel).mapToType(ValidateTestModel);

    expect(expected.id).toBe(originalModel.id);
    expect(expected.hasAllLowerCase).toBe(originalModel.hasAllLowerCase);

    originalModel.hasAllLowerCase = 'UPPER';
    expect(() => take(originalModel).mapToType(ValidateTestModel)).toThrow();
});
