import { Address, Hex, encodeAbiParameters, toHex } from "viem";

interface ABI {
  name: string;
  type: string;
}

const INPUT_ABI: { [key: string]: ABI[] } = {
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
  warp: Hex;
  swap: Hex;
  payportion: Hex;
  sweep: Hex;
}

export class UniswapParams {
  public command: Hex = "0x0b000604";
  public DAI: Address = "0x50c5725949a6f0c72e6c4a641f24049a917db0cb";

  inputs = new Input();

  constructor(public amountMin: bigint, public amount: bigint) {
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
    const formatInputs: Hex[] = [];

    formatInputs.push(this.inputs.warp);
    formatInputs.push(this.inputs.swap);
    formatInputs.push(this.inputs.payportion);
    formatInputs.push(this.inputs.sweep);

    return formatInputs;
  }

  getParams(type: string, value: any[]) {
    return encodeAbiParameters(INPUT_ABI[type], value);
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

    return inputBytes as Hex;
  }

  private getPath() {
    return [
      "000000000000000000000000000000000000000000000000000000000000002b",
      "42000000000000000000000000000000000000060001f450c5725949a6f0c72e",
      "6c4a641f24049a917db0cb000000000000000000000000000000000000000000",
    ];
  }

  toReceipt(index: number): Hex {
    return toHex(index, { size: 20 });
  }
}
