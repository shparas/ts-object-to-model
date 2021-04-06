import { take } from '..';
import {
    TestNestedModel,
    TestModel,
    generateOriginalMethod,
    OptionalTestModel,
    OptionalWithValidatorTestModel,
} from './test-data';

test('Valid @optional and take/map tester', () => {
    let originalModel = generateOriginalMethod();

    let expected = take(originalModel).mapToType(OptionalTestModel);

    expect(expected.id).toBe(originalModel.id);
    expect(expected.hasAllLowerCase).toBe(originalModel.hasAllLowerCase);

    console.log(expected);
});

test('Valid @optional and take/map tester with validator', () => {
    let originalModel = generateOriginalMethod();

    let expected = take(originalModel).mapToType(OptionalWithValidatorTestModel);

    expect(expected.id).toBe(originalModel.id);
    expect(expected.hasAllLowerCase).toBe(originalModel.hasAllLowerCase);

    console.log(expected);
});
