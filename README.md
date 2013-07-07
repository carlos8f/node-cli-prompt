cli-prompt
==========

A tiny CLI prompter

[![build status](https://secure.travis-ci.org/carlos8f/node-cli-prompt.png)](http://travis-ci.org/carlos8f/node-cli-prompt)

Install
-------

```javascript
$ npm install --save cli-prompt
```

Usage
-----

### `prompt(message, handler)`

- `message`: text prompt for the user
- `handler`: function to be called with the entered text

Example
-------

```js
var prompt = require('cli-prompt');

prompt('enter your first name: ', function (val) {
  var first = val;
  prompt('and your last name: ', function (val) {
    console.log('hi, ' + first + ' ' + val + '!');
  });
});
```

### Password/hidden input

```js
var prompt = require('cli-prompt');

prompt.password('tell me a secret: ', function (val) {
  console.log(val);
});
```

### Multiple questions

```js
var prompt = require('cli-prompt');

prompt.multi([
  {
    key: 'username',
    default: 'john_doe'
  },
  {
    label: 'password (must be at least 5 characters)',
    key: 'password',
    type: 'password',
    validate: function (val) {
      if (val.length < 5) throw new Error('password must be at least 5 characters long');
    }
  },
  {
    label: 'number of pets',
    key: 'pets',
    type: 'number',
    default: function () {
      return this.password.length;
    }
  },
  {
    label: 'is this ok?',
    type: 'boolean'
  }
], console.log);
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (C) 2012 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2012 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.