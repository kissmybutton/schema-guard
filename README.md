# schema-guard

[![Build Status](https://travis-ci.org/kissmybutton/schema-guard.svg?branch=master)](https://travis-ci.org/kissmybutton/schema-guard) ![npm (scoped)](https://img.shields.io/npm/v/@kissmybutton/schema-guard.svg) [![Coverage Status](https://coveralls.io/repos/github/kissmybutton/schema-guard/badge.svg?branch=master)](https://coveralls.io/github/kissmybutton/schema-guard?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/kissmybutton/schema-guard.svg)](https://greenkeeper.io/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/kissmybutton/schema-guard/blob/master/CONTRIBUTING.md)

A configurable schema object validator.

### Installation

schema-guard is available as an [npm package](https://www.npmjs.com/package/@kissmybutton/schema-guard).

```sh
// with npm
npm install @kissmybutton/schema-guard

// with yarn
yarn add @kissmybutton/schema-guard
```

### Demo

Online demo [here](https://codesandbox.io/s/n9vpj4j404)

### Usage

```javascript
import Validator from '@kissmybutton/schema-guard';

const configuration = {
 width: {
   type: 'string'
 }
};

let validator = new Validator(configuration);
const objectToValidate = {
  width: '100px'
};

let validation = validator.validate(objectToValidate);


// Results in an objects with valid and errors properties

// validation.valid: true/false
// validation.errors: array of objects of type { message: string }

```

### Development

```bash
git clone https://github.com/kissmybutton/schema-guard.git YOURFOLDERNAME
cd YOURFOLDERNAME

# Run npm install and write your library name when asked. That's all!
npm install
```

**Start coding!** `package.json` and entry files are already set up for you, so don't worry about linking to your main file, typings, etc. Just keep those files with the same name.

### Features

 - Zero-setup. After running `npm install` things will setup for you :wink:

### Allowed types
Property | Type | Required | Description
-------- | ---- | -------- | -----------
`type` | String | ✓ | The type definition of the attribute type
`required` | Array | |  If defined, the required attribute is an array where the first item is the flag whether or not the attribute is required, and the second item of the array is the custom error message text: ```required: [true, 'is required']```
`validate` | Function | | If defined, the validate attribute is a function that adds the ability of custom implementations for validations. Example: ```validate: { validator: function(v) {  return /\d{4}/.test(v) }, message: 'my custom message'},``` This will validate the input to be exactly 4 digits long. 
`minimum` | Number | | When defining type of number or integer, you can define minimum value so that it validates that the value is equal or greater than the defined value
`maximum` | Number | | When defining type of number or integer, you can define maximum value so that it validates that the value is equal or smaller than the defined value
`units` | Object | | If defined, you must also define an enum property which is an array of strings. Each item in that array is of type ```string``` and the given string that is to be validated must include at least one of the defined units.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
