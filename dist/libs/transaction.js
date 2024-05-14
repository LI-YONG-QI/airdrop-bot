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
exports.sendTransaction = void 0;
const public_1 = require("../utils/clients/public");
function sendTransaction(request, signer) {
    return __awaiter(this, void 0, void 0, function* () {
        while (1) {
            const hash = yield signer.writeContract(request);
            const transaction = yield public_1.PUBLIC_CLIENT.waitForTransactionReceipt({
                confirmations: 5,
                hash,
                pollingInterval: 12000,
            });
            console.log(`Tx Hash: ${transaction.transactionHash} - ${transaction.status}`);
            if (transaction.status === "success")
                break;
            console.log("Reverted !! Retrying...");
        }
    });
}
exports.sendTransaction = sendTransaction;
