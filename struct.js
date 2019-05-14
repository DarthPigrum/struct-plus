'use strict';
function struct(...components) {
  const result = { index: {}, size: 0 };
  for (const component of components) {
    const [type, name, arraySize] = component;
    if (arraySize) {
      const arr = [];
      for (let i = 0; i < arraySize; i++) arr.push([type, i]);
      const array = struct(...arr);
      result.index[name] = Object.assign({}, array, { offset: result.size });
      result.size += array.size;
    } else {
      result.index[name] = Object.assign({}, type, { offset: result.size });
      result.size += type.size;
    }
  }
  return result;
}
class Struct {
  constructor(struct) {
    this.index = struct.index;
    this.size = struct.size;
    this.buffer = Buffer.alloc(struct.size);
  }
  get data() {
    return this._objectify();
  }
  set data(value) {
    return Object.assign(this.data, value);
  }
  _objectify(index = this.index, offset = 0) {
    const that = this;
    const result = {};
    for (const element in index) {
      const cell = index[element];
      Object.defineProperty(result, element, cell.index ?
        {
          enumerable: true,
          get: () => that._objectify(cell.index, cell.offset + offset),
          set: (obj) => Object.assign(result[element], obj)
        } :
        {
          enumerable: true,
          get: () => cell.read(that.buffer, cell.offset + offset),
          set: (value) => cell.write(that.buffer, cell.offset + offset, value)
        });
    }
    return result;
  }
}
module.exports = { struct, Struct };
