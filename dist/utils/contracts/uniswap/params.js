"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapParams = void 0;
const viem_1 = require("viem");
const INPUT_ABI = {
    warp: [
        { name: "receipt", type: "address" },
        { name: "amount", type: "uint256" },
    ],
    swap: [
        { name: "receipt", type: "address" },
        { name: "amount", type: "uint256" },
        { name: "amountMin", type: "uint256" },
        { name: "pathOffset", type: "uint256" },
        { name: "payIsUser", type: "bool" },
    ],
    payportion: [
        { name: "token", type: "address" },
        { name: "receipt", type: "address" },
        { name: "bips", type: "uint256" },
    ],
    sweep: [
        { name: "token", type: "address" },
        { name: "receipt", type: "address" },
        { name: "amountMin", type: "uint256" },
    ],
};
class Input {
}
class UniswapParams {
    constructor(amountMin, amount) {
        this.amountMin = amountMin;
        this.amount = amount;
        this.command = "0x0b000604";
        this.DAI = "0x50c5725949a6f0c72e6c4a641f24049a917db0cb";
        this.inputs = new Input();
        this.inputs.warp = this.getParams("warp", [this.toReceipt(2), this.amount]);
        this.inputs.swap = this.getSwapParams();
        this.inputs.payportion = this.getParams("payportion", [
            this.DAI,
            "0x067170777ba8027ced27e034102d54074d062d71",
            BigInt(25),
        ]);
        this.inputs.sweep = this.getParams("sweep", [
            this.DAI,
            this.toReceipt(1),
            this.amountMin,
        ]);
    }
    formatInputs() {
        const formatInputs = [];
        formatInputs.push(this.inputs.warp);
        formatInputs.push(this.inputs.swap);
        formatInputs.push(this.inputs.payportion);
        formatInputs.push(this.inputs.sweep);
        return formatInputs;
    }
    getParams(type, value) {
        return (0, viem_1.encodeAbiParameters)(INPUT_ABI[type], value);
    }
    getSwapParams() {
        let inputBytes = this.getParams("swap", [
            this.toReceipt(2),
            this.amount,
            this.amountMin,
            BigInt(160),
            false,
        ]);
        const parsePath = this.getPath().join("");
        inputBytes += parsePath;
        return inputBytes;
    }
    getPath() {
        return [
            "000000000000000000000000000000000000000000000000000000000000002b",
            "42000000000000000000000000000000000000060001f450c5725949a6f0c72e",
            "6c4a641f24049a917db0cb000000000000000000000000000000000000000000",
        ];
    }
    toReceipt(index) {
        return (0, viem_1.toHex)(index, { size: 20 });
    }
}
exports.UniswapParams = UniswapParams;
