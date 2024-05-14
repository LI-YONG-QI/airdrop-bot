"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aave = void 0;
const viem_1 = require("viem");
const commander_1 = require("commander");
const protocol_1 = require("../types/protocol");
const aave_1 = require("../utils/aave");
const cron_1 = require("../libs/cron");
exports.aave = new commander_1.Command("aave");
exports.aave
    .description("Start the aave protocol")
    .option("-p, --pk <private key>", "private key of signer")
    .option("    --amount <amount>", "amount of ETH")
    .option("-d, --delay <delay time>", "delay in minutes")
    .option("-c, --cronjob <cron job...>", 'cron job expression i.e. "*/5 * * * *"')
    .action((options) => {
    const aaveProtocol = new protocol_1.Protocol(aave_1.aave, options.pk, (0, viem_1.parseEther)(options.amount), (0, cron_1.parseCronJob)(options.cronjob), Number(options.delay));
    aaveProtocol.execute();
});
