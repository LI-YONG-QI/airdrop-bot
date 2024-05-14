"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_CLIENT = void 0;
const viem_1 = require("viem");
const config_1 = require("./config");
exports.PUBLIC_CLIENT = (0, viem_1.createPublicClient)(config_1.CONFIG);
