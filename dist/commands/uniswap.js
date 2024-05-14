"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniswap = void 0;
const viem_1 = require("viem");
const commander_1 = require("commander");
const protocol_1 = require("../types/protocol");
const uniswap_1 = require("../utils/uniswap");
const cron_1 = require("../libs/cron");
exports.uniswap = new commander_1.Command("uniswap");
exports.uniswap
    .description("Start the uniswap protocol")
    .option("-p, --pk <private key>", "private key of signer")
    .option("    --amount <amount>", "amount of ETH")
    .option("-d, --delay <delay time>", "delay in minutes")
    .option("-c, --cronjob <cron job...>", 'cron job expression (every five seconds i.e. "*/5 * * * *")')
    .action((options) => {
    const uniswapProtocol = new protocol_1.Protocol(uniswap_1.uniswap, options.pk, (0, viem_1.parseEther)(options.amount), (0, cron_1.parseCronJob)(options.cronjob), Number(options.delay));
    uniswapProtocol.execute();
});
