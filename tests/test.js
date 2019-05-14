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
const testFloatTypes = (types) => {
  const arr = [];
  let i = 0;
  for (const type of types) {
    const name = names[i % names.length] + i;
    arr.push([type, i + name], [type, name, i + 2]);
    i++;
  }
  const description = struct(...arr);
  const instance = new Struct(description);
  i = 0;
  for (const type of types) {
    const name = names[i % names.length] + i;
    const value = 1 / Math.pow(2, type.size);
    instance.data[i + name] = value;
    instance.data[name][i] = value * 2;
    i++;
  }
  i = 0;
  for (const type of types) {
    const name = names[i % names.length] + i;
    const value = 1 / Math.pow(2, type.size);
    assert.strictEqual(instance.data[i + name], value,
      'float read/write failed');
    assert.strictEqual(instance.data[name][i], value * 2,
      'float array read/write failed');
    i++;
  }
};
const testChar = type => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const length = alphabet.length;
  const arr = [];
  for (let i = 0; i < length; i++) {
    const name = names[i % names.length] + i;
    arr.push([type(i + 2), name]);
  }
  const description = struct(...arr);
  const instance = new Struct(description);
  for (let i = 0; i < length; i++) {
    const name = names[i % names.length] + i;
    const value = alphabet.substring(0, i + 1);
    instance.data[name] = value;
  }
  for (let i = 0; i < length; i++) {
    const name = names[i % names.length] + i;
    const value = alphabet.substring(0, i + 1) + '\0';
    assert.strictEqual(instance.data[name], value,
      'string read/write failed');
  }
};
testIntTypes([types.int8, types.int16, types.int32, types.int48,
  types.uint8, types.uint16, types.uint32, types.uint48]);
testIntArrayTypes([types.int8, types.int16, types.int32, types.int48,
  types.uint8, types.uint16, types.uint32, types.uint48]);
testFloatTypes([types.float, types.double]);
testChar(types.char);
console.log('passed');
