import { optional, field, ignore, Types, validate } from '..';

export var lowerCaseValidator = (data: string): boolean => data === data.toLowerCase();

var trueyValidator = (data: any) => true;
var falsyValidator = (data: any) => false;

export var generateOriginalMethod = () => {
    return {
        id: 'my_id',
        _name: 'my name',
        lastname: 'Last',
        nestedModel: {
            nestedId: 'nestedIdValue0',
            _nestedName: 'nestedNameValue0',
            nestedIgnored: 'nestedIgnored0',
        },
        nestedModel1: {
            nestedId: 'nestedIdValue1',
            _nestedName: 'nestedNameValue1',
            nestedIgnored: 'nestedIgnored1',
        },
        nestedModel3: {
            nestedId: 'nestedIdValue2',
            _nestedName: 'nestedNameValue2',
            nestedIgnored: 'nestedIgnored2',
        },
        doubleNestedModel: {
            nestedId: 'nestedModelId',
            _nestedNested: {
                nestedId: 'nestedNestedIdValue',
                _nestedName: 'nestedNestedNameValue',
                nestedIgnored: 'nestedNestedIgnored',
            },
        },
        status: 'active',
        expireTime: -1,
        hasAllLowerCase: 'lowercase',
        hasAllUpperCase: 'UPPERCASE',
    };
};

export class TestNestedModel {
    public nestedId?: string = undefined;
    @field({ sourceName: '_nestedName' })
    public nestedName?: string = undefined;
}

//#region '@field' test models
export class TestDoubleNestedModel {
    public nestedId?: string = undefined;

    @field({ sourceName: '_nestedNested', destinationType: TestNestedModel })
    public nestedNestedModel?: TestNestedModel = undefined;
}

export class TestModel {
    id?: string = undefined;

    @field({
        sourceName: '_name',
        destinationType: Types.string,
        validators: [lowerCaseValidator],
        transformer: (x) => 'Hello ' + x,
    })
    public name?: string = undefined;

    @field({ sourceName: 'nestedModel', destinationType: TestNestedModel })
    public nestedModel1?: TestNestedModel = undefined;
    @field({ sourceName: 'nestedModel1', destinationType: TestNestedModel, validators: [] })
    public nestedModel2?: TestNestedModel = undefined;
    @field({ destinationType: TestNestedModel, validators: [trueyValidator] })
    public nestedModel3?: TestNestedModel = undefined;
    @field({ destinationType: TestDoubleNestedModel })
    public doubleNestedModel?: TestDoubleNestedModel = undefined;
}
//#endregion

//#region '@optional()' test models
export class OptionalTestModel {
    id?: string = undefined;
    @optional()
    public hasAllLowerCase?: string = undefined;
}

export class OptionalWithValidatorTestModel {
    id?: string = undefined;
    @optional([lowerCaseValidator])
    public hasAllLowerCase?: string = undefined;
}
//#endregion

//#region '@ignore()' test models
export class IgnoreTestModel {
    id?: string = undefined;
    @ignore()
    public hasAllLowerCase?: string = undefined;
}

export class IgnoreWithValidatorTestModel {
    id?: string = undefined;
    @ignore([lowerCaseValidator])
    public hasAllLowerCase?: string = undefined;
}
//#endregion

//#region '@validate()' test models
export class ValidateTestModel {
    id?: string = undefined;
    @validate([lowerCaseValidator])
    public hasAllLowerCase?: string = undefined;
}

export class EmptyValidateTestModel {
    id?: string = undefined;
    @validate()
    public hasAllLowerCase?: string = undefined;
}
//#endregion

test('Data files, nothing to test here.', () => {});
