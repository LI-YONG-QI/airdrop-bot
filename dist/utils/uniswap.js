"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniswap = void 0;
const transaction_1 = require("../libs/transaction");
const params_1 = require("./contracts/uniswap/params");
const uniswap_1 = require("./contracts/uniswap");
const public_1 = require("./clients/public");
function getPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        const latestBlockNumber = yield public_1.PUBLIC_CLIENT.getBlockNumber();
        const logs = yield uniswap_1.UNI_V3_POOl.getEvents.Swap(undefined, {
            fromBlock: latestBlockNumber - BigInt(100),
            toBlock: latestBlockNumber,
        });
        const { args } = logs[logs.length - 1];
        let { amount0, amount1 } = args;
        if (amount0 && amount1) {
            if (amount0 < BigInt(1))
                amount0 = amount0 * BigInt(-1);
            if (amount1 < BigInt(1))
                amount1 = amount1 * BigInt(-1);
            return amount1 / amount0;
        }
        throw new Error("No price found");
    });
}
const uniswap = (_signer, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const price = yield getPrice();
    const deadline = BigInt(Math.floor(Date.now() / 1000)) + BigInt(60 * 5);
    const params = new params_1.UniswapParams(BigInt(price), amount);
    const { request } = yield uniswap_1.UNISWAP_ROUTER.simulate.execute([params.command, params.formatInputs(), deadline], {
        account: _signer.account,
        value: amount,
    });
    console.log("Swap...");
    yield (0, transaction_1.sendTransaction)(request, _signer);
});
exports.uniswap = uniswap;
