[![npm version](https://img.shields.io/npm/v/ts-object-to-model.svg)](https://www.npmjs.com/package/ts-object-to-model)
[![Downloads](https://img.shields.io/npm/dm/ts-object-to-model.svg)](https://www.npmjs.com/package/ts-object-to-model)

\*_This README is still a draft and will be updated as the development of library progresses._

# ts-object-to-model

**ts-object-to-model** is a tool for mapping an object to a predefined model for TypeScript projects.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Version History](#version-history)
4. [Report Issues](#report-issues)
5. [License](#license)

## <a name="installation"></a>Installation

Prerequisites: [Node.js](https://nodejs.org/) (`^10.12.0`, or `>=12.0.0`) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)

To install the library:

```sh
$ npm i ts-object-to-model
```

## <a name="usage"></a>Usage

The library is to be used in a TypeScript project with the [experimental decorators enabled](https://www.typescriptlang.org/docs/handbook/decorators.html). See an example below on the basic usage of the library:

```ts
import { take, optional, field, ignore, validate } from 'ts-object-to-model';

class TestModel {
    @field({ sourceName: '_id', destinationType: 'string', transformer: (x) => x.toLowerCase() })
    public id?: string = undefined; // will be mapped from _id as a string type after lowercase transformation

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

    console.log(JSON.stringify(properModel)); // {"id":"myid","firstname":"First","lastname":"Last","gender":"m","status":"active","expireTime":SOMENUMBER}
};

mainFunction();
```

### take().mapToType()

_take()_ takes a raw JSON or JS object which will be used to extract the values during the transformation. It is also referred to as source object in this readme.  
_mapToType()_ takes the destination object/class name and, optionally, a boolean parameter _strict_. If _strict_ is true (defualt), then the error is thrown if the property isn't found in source object. If _strict_ is false, then the error is not thrown if property isn't found and the proeprty will be undefined.
**Example Usage:**

```ts
let TestModel = take(randomObject).mapToType(TestModel, false);
let TestModelStrict = take(randomObject).mapToType(TestModel);
```

**Explanation:**  
The first line of code above takes the randomObject, that has a lot of properties, and maps it into typed TestModel with strict mapping disabled (meaning that it will not throw error if property isn't found in source object).  
Likewise, the second line of code above takes the randomObject, and maps it into typed TestModelStrict with strict mapping enabled by default (meaning that it will throw error if non-optional or non-ignorable property isn't found in source object).

### _@field_ Decorator

The @field is used to map one property to another. It takes an object with following properties as a parameter:

-   **sourceName**: The name of the property in the original object from which we are mapping. If not specified, defaults to the property name in the new object/model.
-   **destinationType**: Defines how the original value is transformed to the new one. If not specified, default to as-is copy/reference. The supported value is either the name of another class (e.g. another model name for nested transformation) or the built-in types as follows:
    -   **Types.string**: New value will be _toString()_ of original value.
    -   **Types.number**: New value will be _parseFloat()_ of original value.
    -   **Types.integer**: New value will be _parseInt()_ of original value.
    -   **Types.boolean**: New value will be true/false based on JS Truthy or Falsy equivalent of original value. All values are truthy except for false, 0, -0, 0n, "", null, undefined, and NaN.
    -   **Types.array**: Work in progress.
    -   **Types.object**: Work in progress.
-   **validators**: An array of function that takes the property value as argument and returns true/false based on validation. If validation fails (any of the function returns false), it will throw error and the transformation will not occur. Can be ignored if there's no validation to run.
-   **transformer**: A function that takes the property value as argument and returns a value after transformation (based on the function user supplies). Can be ignored if no transformation is required.

**Example Usage:**

```ts
@field({
    sourceName: '_id',
    destinationType: Types.string,
    transformer: (x) => x.toLowerCase(),
    validators: [(val) => val !== ""]
})
public id?: string = undefined;
```

**Explanation:**  
The above code maps the \__id_ field from raw JSON or JS object into _id_ as a lowercase string, as long as the \_id is not empty. If its empty, throws error and object transformation wont take place.

### _@optional_ Decorator

As the name suggests, the @optional decorator is used to mark a property as optional, meaning that no error will be thrown if the property couldn't be mapped (e.g. if the property doesn't exist in source file). It takes an array of validator functions as optional parameter. If the validator functions yeild true then @optional will work, else won't (same as if @optional was never there).

**Example Usage:**

```ts
@optional([(val) => true])  // or just @optional() for no validation
public id?: string = undefined;
```

**Explanation:**  
The above code maps the _id_ if it exists in the raw JSON or JS Object. If it doesn't exist, won't throw any error, just like when strict is disabled in take().mapTo() method.

### _@ignore_ Decorator

Likewise, the @ignore decorator is used to ignore a mapping to a particular property. It takes an array of validator functions as optional parameter. If the validator functions yeild true then @ignore will work, else won't (same as if @ignore was never there).

**Example Usage:**

```ts
@ignore([(val) => val !== "123"])  // or just @ignore() for no validation
public id?: string = undefined;
```

**Explanation:**  
The above code ignores the mapping of the _id_ as long as its not equal to "123". If it is "123", id will be mapped. If validator function wasn't passed, i.e. @ignore() was used, would ignore mapping for all values.

### _@validate_ Decorator

The @validate decorator is used to validate the property value based on the validation functions, passed as array, before the mapping is done. If any of the validation function yields false, mapping will stop and will throw error.

**Example Usage:**

```ts
@validate([(val) => val === val.toLowercase()])
public id?: string = undefined;
```

**Explanation:**  
The above code maps the _id_ as long as the value of _id_ is all lowercase. If any of the character is uppercase, it will throw out error and mapping stops.

## <a name="version-history"></a>Version History

### Version 2.1.0:

-   Support for transformer in field object

### Version 2.0.0:

-   Support for validators
-   Support for nested object mapping
-   Object _{sourceName, destinationType, validators}_ as parameter for @field
-   Require () for @ignore and @optional (i.e. @ignore() and @optional() instead of just @ignore and @optional)
-   Support for optional array of validator functions as parameters for @optional and @ignore
-   Fix some minor bugs

## <a name="report-issues"></a>Report Issues

To report any issues, please visit our [GitHub Issues](https://github.com/shparas/ts-object-to-model/issues) page.

## <a name="license"></a>License

ISC
