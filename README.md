[![npm version](https://img.shields.io/npm/v/ts-object-to-model.svg)](https://www.npmjs.com/package/ts-object-to-model)
[![Downloads](https://img.shields.io/npm/dm/ts-object-to-model.svg)](https://www.npmjs.com/package/ts-object-to-model)

**This README is still a draft and will be updated as the development of library progresses.*

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
$ npm install ts-object-to-model
```

## <a name="usage"></a>Usage
The library is to be used in a TypeScript project with the experimental decorators enabled. Below is an example of how the library can be used:

```ts
import { take } from 'ts-object-to-model';
import { optional, field, ignore } from 'ts-object-to-model';

class TestModel {
    @field('_id', 'string')
    public id?: string = undefined; // will be mapped from _id as a string type

    public firstname?: string = undefined; // if strict is true, throws error if not found in a source object
    public lastname?: string = undefined;

    @optional
    public status?: string = undefined; // will not throw error if not found in a source object

    @ignore()
    public expireTime: number = Date.now() + 3600 * 1000; // will not be mapped
}

let mainFunction = () => {
    let randomObject = {
        _id: 'myId',
        firstname: 'First',
        lastname: 'Last',
        status: 'active',
        expireTime: -1,
        someOtherProps: "Will be ignored"
    };

    let properModel = take(randomObject).mapToType(TestModel); // mapToType(TestModel, true) for strict mapping (throws error if property not found in source object)
    
    console.log(JSON.stringify(properModel)); // {"id":"myId","firstname":"First","lastname":"Last","status":"active","expireTime":1616982634712}
} 
```

## <a name="version-history"></a>Version History
Coming out soon.

## <a name="report-issues"></a>Report Issues
To report any issues, please visit our [GitHub Issues](https://github.com/shparas/ts-object-to-model/issues) page.

## <a name="license"></a>License
MIT