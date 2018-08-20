# schema-guard

[![Build Status](https://travis-ci.org/kissmybutton/schema-guard.svg?branch=master)](https://travis-ci.org/kissmybutton/schema-guard) ![npm (scoped)](https://img.shields.io/npm/v/@kissmybutton/schema-guard.svg) [![Coverage Status](https://coveralls.io/repos/github/kissmybutton/schema-guard/badge.svg?branch=master)](https://coveralls.io/github/kissmybutton/schema-guard?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/kissmybutton/schema-guard.svg)](https://greenkeeper.io/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/kissmybutton/schema-guard/blob/master/CONTRIBUTING.md)

A configurable schema object validator.

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

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
