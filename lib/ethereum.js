"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfuraProvider = void 0;

var ethers = _interopRequireWildcard(require("ethers"));

var _interfaces = require("./interfaces");

var _network = require("./network");

var _abiDecoder = require("abi-decoder");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var InfuraProvider =
/*#__PURE__*/
function (_EtherProvider) {
  _inherits(InfuraProvider, _EtherProvider);

  function InfuraProvider(url, network) {
    var _this;

    _classCallCheck(this, InfuraProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InfuraProvider).call(this, url, ''));
    _this.network = network || 'rinkeby';
    _this.__etherscan = _this.network === 'mainnet' ? '' : "-".concat(_this.network);
    _this.__api = "https://api".concat(_this.__etherscan, ".etherscan.io/api");
    return _this;
  }

  _createClass(InfuraProvider, [{
    key: "broadcast",
    value: function () {
      var _broadcast = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(tx) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                response = (0, _network.rpcHttp)(this.url, 'eth_sendRawTransaction', [tx]);

                if (response.error) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", response.result);

              case 3:
                return _context.abrupt("return", response.error);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function broadcast(_x) {
        return _broadcast.apply(this, arguments);
      }

      return broadcast;
    }()
  }, {
    key: "__requestRPC",
    value: function () {
      var _requestRPC = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(methodName) {
        var params,
            response,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
                _context2.next = 3;
                return (0, _network.rpcHttp)(this.url, methodName, params);

              case 3:
                response = _context2.sent;

                if (response.error) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", response.result);

              case 6:
                return _context2.abrupt("return", response.error.message);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function __requestRPC(_x2) {
        return _requestRPC.apply(this, arguments);
      }

      return __requestRPC;
    }()
  }, {
    key: "__get_etherscan_api",
    value: function () {
      var _get_etherscan_api = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(url) {
        var data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return InfuraProvider.__requestHTTP(url);

              case 2:
                data = _context3.sent;

                if (!(data.status === '1')) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", data.result);

              case 5:
                return _context3.abrupt("return", null);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function __get_etherscan_api(_x3) {
        return _get_etherscan_api.apply(this, arguments);
      }

      return __get_etherscan_api;
    }()
  }, {
    key: "getNonce",
    value: function () {
      var _getNonce = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(address) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.__requestRPC('eth_getTransactionCount', [address, 'latest']);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getNonce(_x4) {
        return _getNonce.apply(this, arguments);
      }

      return getNonce;
    }()
  }, {
    key: "getGasLimit",
    value: function () {
      var _getGasLimit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(tx) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.__requestRPC('eth_estimateGas', [tx]);

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getGasLimit(_x5) {
        return _getGasLimit.apply(this, arguments);
      }

      return getGasLimit;
    }()
  }, {
    key: "getGasPrice",
    value: function () {
      var _getGasPrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.__requestRPC('eth_gasPrice');

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getGasPrice() {
        return _getGasPrice.apply(this, arguments);
      }

      return getGasPrice;
    }()
  }, {
    key: "getAbi",
    value: function () {
      var _getAbi = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(contractAddress) {
        var url;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                url = "".concat(this.__api, "?module=contract&action=getabi&address=").concat(contractAddress);
                return _context7.abrupt("return", this.__get_etherscan_api(url));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getAbi(_x6) {
        return _getAbi.apply(this, arguments);
      }

      return getAbi;
    }()
  }, {
    key: "etherCall",
    value: function () {
      var _etherCall = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(tx, methodName, params) {
        var abi, inter, method;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.getAbi(tx.to || tx);

              case 2:
                abi = _context8.sent;

                if (abi) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt("return", null);

              case 5:
                inter = new ethers.utils.Interface(abi);
                method = inter.functions[methodName]; // @ts-ignore

                tx.data = method.encode(params);
                _context8.next = 10;
                return this.__requestRPC('eth_call', [tx, 'latest']);

              case 10:
                return _context8.abrupt("return", _context8.sent);

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function etherCall(_x7, _x8, _x9) {
        return _etherCall.apply(this, arguments);
      }

      return etherCall;
    }()
  }, {
    key: "getContractName",
    value: function () {
      var _getContractName = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(contractAddress) {
        var url, response;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                url = "".concat(this.__api, "?module=account&action=tokentx&contractaddress=").concat(contractAddress, "&page=1&offset=1");
                _context9.next = 3;
                return this.__get_etherscan_api(url);

              case 3:
                response = _context9.sent;

                if (response) {
                  _context9.next = 6;
                  break;
                }

                return _context9.abrupt("return", response);

              case 6:
                return _context9.abrupt("return", response[0].tokenName);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getContractName(_x10) {
        return _getContractName.apply(this, arguments);
      }

      return getContractName;
    }()
  }], [{
    key: "__requestHTTP",
    value: function () {
      var _requestHTTP = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(url) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return (0, _network.http)(url);

              case 2:
                return _context10.abrupt("return", _context10.sent);

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function __requestHTTP(_x11) {
        return _requestHTTP.apply(this, arguments);
      }

      return __requestHTTP;
    }()
  }, {
    key: "addABI",
    value: function addABI(abi) {
      (0, _abiDecoder.addABI)(abi);
    }
  }, {
    key: "decodeMethod",
    value: function decodeMethod(hexString) {
      return (0, _abiDecoder.decodeMethod)(hexString);
    }
  }]);

  return InfuraProvider;
}(_interfaces.EtherProvider);

exports.InfuraProvider = InfuraProvider;