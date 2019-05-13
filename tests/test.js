'use strict';
const { struct, Struct } = require('..');
const types = require('../types');
const assert = require('assert');
const names = 'lorem ipsum dolor sit amet'.split(' ');
const testIntTypes = (types) => {
  const arr = [];
  let i = 0;
  for (const type of types) {
    const name = names[i % names.length] + i;
    arr.push([type, name]);
    i++;
  }
  const description = struct(...arr);
  const instance = new Struct(description);
  i = 0;
  for (const type of types) {
    const name = names[i % names.length] + i;
    const prevalue = Math.pow(2, type.size * 8 - 2) - 1;
    const value = Math.pow(2, type.size * 8 - 2) + 1;
    instance.data[name] = prevalue;
    assert.strictEqual(instance.data[name],
      prevalue, 'int scalar read/write failed');
    instance.data = { [name]: value };
    i++;
  }
  i = 0;
  for (const type of types) {
    const name = names[i % names.length] + i;
    const value = Math.pow(2, type.size * 8 - 2) + 1;
    assert.strictEqual(instance.data[name], value,
      'int objective read/write failed');
    i++;
  }
};
const testIntArrayTypes = (types) => {
  const arr = [];
  let i = 0;
  for (const type of types) {
    const name = names[i % names.length] + i;
    arr.push([type, name, i + 2]);
    i++;
  }
  const description = struct(...arr);
  const instance = new Struct(description);
  i = 0;
  for (const type of types) {
    const name = names[i % names.length] + i;
    const prevalue = Math.pow(2, type.size * 8 - 2) - 1;
    const value = Math.pow(2, type.size * 8 - 2) + 1;
    instance.data[name][i] = prevalue;
    assert.strictEqual(instance.data[name][i], prevalue,
      'int array scalar read/write failed');
    instance.data = { [name]: { [i]: value } };
    i++;
  }
  i = 0;
  for (const type of types) {
    const name = names[i % names.length] + i;
    const value = Math.pow(2, type.size * 8 - 2) + 1;
    assert.strictEqual(instance.data[name][i], value,
      'int array objective read/write failed');
    i++;
  }
};
testIntTypes([types.int8, types.int16, types.int32, types.int48,
  types.uint8, types.uint16, types.uint32, types.uint48]);
testIntArrayTypes([types.int8, types.int16, types.int32, types.int48,
  types.uint8, types.uint16, types.uint32, types.uint48]);
console.log('passed');
