### NodeJS module to work with buffers as with structures
[![Build Status](https://travis-ci.org/DarthPigrum/struct-plus.svg?branch=master)](https://travis-ci.org/DarthPigrum/struct-plus)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4e005af4c2854774a96a9f35e75c0d6b)](https://www.codacy.com/app/DarthPigrum/struct-plus?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DarthPigrum/struct-plus&amp;utm_campaign=Badge_Grade)
[![npm version](https://badge.fury.io/js/struct-plus.svg)](https://badge.fury.io/js/struct-plus)
#### Usage
##### Declaration
To describe the structure you should use this syntax:
```javascript
const { struct } = require('struct-plus');
const description = struct([type0, name0, arraySize0(optional)], [type1, name1, arraySize1(optional)],...);
```
Where type may be:  
1.Scalar(int,float,double,char(n))  
2.Another structure description  
You can use built-in scalar types:
```javascript
const { struct } = require('struct-plus');
const types = require('struct-plus/types');
const substruct = struct([types.int8, 'first'], [types.uint16, 'second'], [types.int48, 'array', 10]);
const description = struct([types.char(16), 'name'], [substruct, 'info']);
```
##### Assigning
Then you can use this description to allocate Buffer:
```javascript
const { Struct } = require('struct-plus');
const instance = new Struct(description);
```
You can get Buffer of this instance using instance.buffer. To get access in JavaScript-readable format you should use instance.data:
```javascript
instance.data.name = 'Alice';
instance.data.info.first = 42;
instance.data.info.array[7] = 0xABCDEF;
```
You can also use objects to set values(it behaves as Object.assign):
```javascript
instance.data.info = { first: 77, second: 34 };
```
In this example first will be set to 77, second to 34, array will not be changed.
