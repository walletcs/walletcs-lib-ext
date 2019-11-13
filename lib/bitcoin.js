"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockCypherProvider = exports.buildOutx = void 0;

var _interfaces = require("./interfaces");

var _network = require("./network");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var buildOutx = function buildOutx(object, address) {
  return {
    address: address,
    satoshis: object.value,
    txId: object.tx_hash,
    outputIndex: object.tx_output_n
  };
};

exports.buildOutx = buildOutx;

var BlockCypherProvider =
/*#__PURE__*/
function (_BitcoinProvider) {
  _inherits(BlockCypherProvider, _BitcoinProvider);

  function BlockCypherProvider(netwok) {
    var _this;

    _classCallCheck(this, BlockCypherProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockCypherProvider).call(this, "https://api.blockcypher.com/v1/btc/", netwok));
    _this.url = _this.url + _this.network + '/';
    return _this;
  }

  _createClass(BlockCypherProvider, [{
    key: "getOutxs",
    value: function () {
      var _getOutxs = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(address) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _network.http)(this.url + 'addrs/' + address + '?unspentOnly=true');

              case 2:
                response = _context.sent;

                if (!response.error) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", response.error);

              case 5:
                return _context.abrupt("return", response.txrefs.map(function (value) {
                  // @ts-ignore
                  return buildOutx(value, response.address);
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOutxs(_x) {
        return _getOutxs.apply(this, arguments);
      }

      return getOutxs;
    }()
  }, {
    key: "broadcast",
    value: function () {
      var _broadcast = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(tx) {
        var _tx, request, response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _tx = {
                  tx: tx
                };
                request = new Request(this.url + 'txs/push', {
                  method: 'POST',
                  body: JSON.stringify(_tx)
                });
                _context2.next = 4;
                return (0, _network.http)(request);

              case 4:
                response = _context2.sent;

                if (!response.error) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", response.error);

              case 7:
                return _context2.abrupt("return", response.hash);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function broadcast(_x2) {
        return _broadcast.apply(this, arguments);
      }

      return broadcast;
    }()
  }]);

  return BlockCypherProvider;
}(_interfaces.BitcoinProvider);

exports.BlockCypherProvider = BlockCypherProvider;