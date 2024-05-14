"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aave = void 0;
const viem_1 = require("viem");
const commander_1 = require("commander");
const protocol_1 = require("../types/protocol");
const aave_1 = require("../utils/aave");
exports.aave = new commander_1.Command("aave");
exports.aave
    .description("Start the aave protocol")
    .option("-p, --pk <private key>", "private key of signer")
    .option("    --amount <amount>", "amount of ETH")
    .option("-d, --delay <delay time>", "delay in minutes")
    .action((options) => {
    const cronTab = process.env.CRONJOB || "* * * * * *";
    const aaveProtocol = new protocol_1.Protocol(aave_1.aave, options.pk, (0, viem_1.parseEther)(options.amount), cronTab, Number(options.delay));
    aaveProtocol.execute();
});
