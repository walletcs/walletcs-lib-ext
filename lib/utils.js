"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToHex = void 0;

var convertToHex = function convertToHex(_int) {
  return '0x' + _int.toString(16);
};

exports.convertToHex = convertToHex;