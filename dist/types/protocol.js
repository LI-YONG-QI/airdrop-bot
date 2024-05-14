"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Protocol = void 0;
const cron_1 = require("cron");
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const cron_2 = require("../libs/cron");
const config_1 = require("../utils/clients/config");
class Protocol {
    constructor(interaction, privateKey, amount, cronTime = "* * * * * *", delay = 0) {
        this.amount = amount;
        this.cronTime = cronTime;
        this.delay = delay;
        const _signer = this.setSigner(privateKey);
        const _interaction = interaction.bind(null, _signer, amount);
        const config = (0, cron_2.createConfig)(_interaction, cronTime, delay);
        this.cron = new cron_1.CronJob(config.cronTime, config.onTick, null, config.start, config.timeZone);
    }
    execute() {
        var _a;
        console.log(`Starting app ...`);
        console.log(`Time ${this.cronTime} | Delay ${this.delay} minutes`);
        console.log(`Account ${(_a = this.signer.account) === null || _a === void 0 ? void 0 : _a.address}`);
        this.cron.start();
    }
    getSigner() {
        return this.signer;
    }
    setSigner(privateKey) {
        const account = (0, accounts_1.privateKeyToAccount)(privateKey);
        const _signer = (0, viem_1.createWalletClient)(Object.assign({ account }, config_1.CONFIG));
        this.signer = _signer;
        return _signer;
    }
}
exports.Protocol = Protocol;
