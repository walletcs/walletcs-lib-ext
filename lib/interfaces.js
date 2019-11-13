"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherProvider = exports.BitcoinProvider = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Provider = function Provider(url, network) {
  _classCallCheck(this, Provider);

  this.url = url;
  this.network = network;
};

var BitcoinProvider =
/*#__PURE__*/
function (_Provider) {
  _inherits(BitcoinProvider, _Provider);

  function BitcoinProvider() {
    _classCallCheck(this, BitcoinProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(BitcoinProvider).apply(this, arguments));
  }

  return BitcoinProvider;
}(Provider);

exports.BitcoinProvider = BitcoinProvider;

var EtherProvider =
/*#__PURE__*/
function (_Provider2) {
  _inherits(EtherProvider, _Provider2);

  function EtherProvider() {
    _classCallCheck(this, EtherProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(EtherProvider).apply(this, arguments));
  }

  return EtherProvider;
}(Provider);

exports.EtherProvider = EtherProvider;