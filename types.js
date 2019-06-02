'use strict';
function type(size, read, write) {
  return { size, read, write };
}
const numtype = (name, size) =>
  type(
    size,
    (buf, offset) => buf[`read${name}`](offset, size),
    (buf, offset, value) => buf[`write${name}`](value, offset, size)
  );
module.exports = {
  int8: numtype('Int8', 1),
  int16: numtype('IntBE', 2),
  int24: numtype('IntBE', 3),
  int32: numtype('IntBE', 4),
  int40: numtype('IntBE', 5),
  int48: numtype('IntBE', 6),
  int64: numtype('BigInt64BE', 8),
  uint8: numtype('UInt8', 1),
  uint16: numtype('UIntBE', 2),
  uint24: numtype('UIntBE', 3),
  uint32: numtype('UIntBE', 4),
  uint40: numtype('UIntBE', 5),
  uint48: numtype('UIntBE', 6),
  uint64: numtype('BigUInt64BE', 8),
  float: numtype('FloatBE', 4),
  double: numtype('DoubleBE', 8),
  char: (size, encoding = 'utf8') =>
    type(
      size,
      (buf, offset) => buf.toString(encoding, offset, size + offset),
      (buf, offset, value) => {
        const string = Buffer.from(value, encoding);
        return string.length <= size ?
          string.copy(buf, offset) :
          console.log(new Error('String is too big'));
      }
    ),
  type,
  numtype
};
