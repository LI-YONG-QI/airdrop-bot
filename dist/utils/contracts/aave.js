"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WETH = exports.AAVE = void 0;
const viem_1 = require("viem");
const abis_1 = require("./abis");
const public_1 = require("../clients/public");
const constants_1 = require("../constants");
exports.AAVE = (0, viem_1.getContract)({
    address: constants_1.AAVE_ADDR,
    abi: abis_1.AAVE_ABI,
    client: { public: public_1.PUBLIC_CLIENT },
});
exports.WETH = (0, viem_1.getContract)({
    address: constants_1.WETH_ADDR,
    abi: abis_1.WETH_ABI,
    client: { public: public_1.PUBLIC_CLIENT },
});
