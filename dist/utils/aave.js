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
exports.aave = void 0;
const viem_1 = require("viem");
const transaction_1 = require("../libs/transaction");
const aave_1 = require("./contracts/aave");
function deposit(signer, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const { account } = signer;
        const { request } = yield aave_1.AAVE.simulate.depositETH([viem_1.zeroAddress, account.address, 0], {
            value: amount,
            account,
        });
        console.log("Deposit...");
        yield (0, transaction_1.sendTransaction)(request, signer);
    });
}
function withdraw(signer, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const { account } = signer;
        const { request: approveReq } = yield aave_1.WETH.simulate.approve([aave_1.AAVE.address, amount], { account: account });
        console.log("Approving...");
        yield (0, transaction_1.sendTransaction)(approveReq, signer);
        const { request: withdrawReq } = yield aave_1.AAVE.simulate.withdrawETH([viem_1.zeroAddress, amount, account.address], { account: account });
        console.log("Withdraw...");
        yield (0, transaction_1.sendTransaction)(withdrawReq, signer);
    });
}
const aave = (_signer, amount) => __awaiter(void 0, void 0, void 0, function* () {
    yield deposit(_signer, amount);
    yield withdraw(_signer, amount);
});
exports.aave = aave;
