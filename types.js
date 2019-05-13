'use strict';
function type(size, read, write) {
  return { size, read, write };
}
const int8 = type(1,
  (buf, offset) => buf.readInt8(offset),
  (buf, offset, value) => buf.writeInt8(value, offset));
const int16 = type(2,
  (buf, offset) => buf.readIntBE(offset, 2),
  (buf, offset, value) => buf.writeIntBE(value, offset, 2));
const int32 = type(4,
  (buf, offset) => buf.readIntBE(offset, 4),
  (buf, offset, value) => buf.writeIntBE(value, offset, 4));
const int48 = type(6,
  (buf, offset) => buf.readIntBE(offset, 6),
  (buf, offset, value) => buf.writeIntBE(value, offset, 6));
const int64 = type(8,
  (buf, offset) => buf.readBigInt64BE(offset),
  (buf, offset, value) => buf.writeBigInt64BE(value, offset));
const uint8 = type(1,
  (buf, offset) => buf.readUInt8(offset),
  (buf, offset, value) => buf.writeUInt8(value, offset));
const uint16 = type(2,
  (buf, offset) => buf.readUIntBE(offset, 2),
  (buf, offset, value) => buf.writeUIntBE(value, offset, 2));
const uint32 = type(4,
  (buf, offset) => buf.readUIntBE(offset, 4),
  (buf, offset, value) => buf.writeUIntBE(value, offset, 4));
const uint48 = type(6,
  (buf, offset) => buf.readUIntBE(offset, 6),
  (buf, offset, value) => buf.writeUIntBE(value, offset, 6));
const uint64 = type(8,
  (buf, offset) => buf.readBigUInt64BE(offset),
  (buf, offset, value) => buf.writeBigUInt64BE(value, offset));
const float = type(4,
  (buf, offset) => buf.readFloatBE(offset),
  (buf, offset, value) => buf.writeFloatBE(value, offset));
const double = type(8,
  (buf, offset) => buf.readDoubleBE(offset),
  (buf, offset, value) => buf.writeDoubleBE(value, offset));
const char = (size, encoding = 'utf8') => type(size,
  (buf, offset) => buf.toString(encoding, offset, size + offset),
  (buf, offset, value) => {
    const string = Buffer.from(value, encoding);
    return string.length <= size ?
      string.copy(buf, offset) :
      console.log(new Error('String is too big'));
  });
module.exports = { int8, int16, int32, int48, int64,
  uint8, uint16, uint32, uint48, uint64,
  float, double, char, type };
