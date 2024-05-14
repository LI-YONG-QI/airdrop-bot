"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNI_V3_POOl = exports.UNISWAP_ROUTER = void 0;
const viem_1 = require("viem");
const abis_1 = require("../abis");
const public_1 = require("../../clients/public");
const constants_1 = require("../../constants");
exports.UNISWAP_ROUTER = (0, viem_1.getContract)({
    address: constants_1.UNISWAP_ROUTER_ADDR,
    abi: abis_1.UNISWAP_ROUTER_ABI,
    client: { public: public_1.PUBLIC_CLIENT },
});
exports.UNI_V3_POOl = (0, viem_1.getContract)({
    address: constants_1.UNI_V3_POOL_ADDR,
    abi: abis_1.UNI_V3_POOL_ABI,
    client: { public: public_1.PUBLIC_CLIENT },
});
