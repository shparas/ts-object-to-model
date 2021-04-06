import { take } from '..';
import { TestNestedModel, TestModel, generateOriginalMethod } from './test-data';

test('Valid @field and take/map tester', () => {
    let originalModel = generateOriginalMethod();

    let expected = take(originalModel).mapToType(TestModel);

    expect(expected.id).toBe(originalModel.id);
    expect(expected.name).toBe(originalModel._name);

    expect(expected.nestedModel1?.nestedId).toBe(originalModel.nestedModel.nestedId);
    expect(expected.nestedModel1?.nestedName).toBe(originalModel.nestedModel._nestedName);

    expect(expected.nestedModel2?.nestedId).toBe(originalModel.nestedModel1.nestedId);
    expect(expected.nestedModel2?.nestedId).toBe(originalModel.nestedModel1.nestedId);

    expect(expected.nestedModel3?.nestedId).toBe(originalModel.nestedModel3.nestedId);
    expect(expected.nestedModel3?.nestedName).toBe(originalModel.nestedModel3._nestedName);

    expect(expected.doubleNestedModel?.nestedId).toBe(originalModel.doubleNestedModel.nestedId);
    expect(expected.doubleNestedModel?.nestedNestedModel?.nestedId).toBe(
        originalModel.doubleNestedModel._nestedNested.nestedId,
    );
    expect(expected.doubleNestedModel?.nestedNestedModel?.nestedName).toBe(
        originalModel.doubleNestedModel._nestedNested._nestedName,
    );
    console.log(expected);
});

test('Invalid @field and take/map tester due to validation inside @field', () => {
    let originalModel = generateOriginalMethod();
    originalModel._name = 'My name';

    expect(() => take(originalModel).mapToType(TestModel)).toThrow();
});
