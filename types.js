'use strict';
function type(size, read, write) {
  return { size, read, write };
}
const numtype = (name, size) => type(size,
  (buf, offset) => buf[`read${name}`](offset, size),
  (buf, offset, value) => buf[`write${name}`](value, offset, size));
const int8 = numtype('Int8', 1);
const int16 = numtype('IntBE', 2);
const int24 = numtype('IntBE', 3);
const int32 = numtype('IntBE', 4);
const int40 = numtype('IntBE', 5);
const int48 = numtype('IntBE', 6);
const int64 = numtype('BigInt64BE', 8);
const uint8 = numtype('UInt8', 1);
const uint16 = numtype('UIntBE', 2);
const uint24 = numtype('UIntBE', 3);
const uint32 = numtype('UIntBE', 4);
const uint40 = numtype('UIntBE', 5);
const uint48 = numtype('UIntBE', 6);
const uint64 = numtype('BigUInt64BE', 8);
const float = numtype('FloatBE', 4);
const double = numtype('DoubleBE', 8);
const char = (size, encoding = 'utf8') => type(size,
  (buf, offset) => buf.toString(encoding, offset, size + offset),
  (buf, offset, value) => {
    const string = Buffer.from(value, encoding);
    return string.length <= size ?
      string.copy(buf, offset) :
      console.log(new Error('String is too big'));
  });
module.exports = {
  int8, int16, int24, int32, int40, int48, int64,
  uint8, uint16, uint24, uint32, uint40, uint48, uint64,
  float, double, char, type, numtype };
