"use strict";

var _bitcoin = require("./bitcoin");

var _ethereum = require("./ethereum");

module.exports = {
  BlockCypherProvider: _bitcoin.BlockCypherProvider,
  InfuraProvider: _ethereum.InfuraProvider
};