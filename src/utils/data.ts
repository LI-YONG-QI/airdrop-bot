//TODO 能動態變更 amount 跟 amountMin
export const uniswapParams2 = {
  command: "0b000604",
  swap: {
    receipt: "0000000000000000000000000000000000000000000000000000000000000002",
    amount: "00000000000000000000000000000000000000000000000000005af3107a4000",
    amountMin:
      "000000000000000000000000000000000000000000000000045bc2a70e6bc8c5",
    pathOffset:
      "00000000000000000000000000000000000000000000000000000000000000a0",
    payIsUser:
      "0000000000000000000000000000000000000000000000000000000000000000",
    path: [
      "0000000000000000000000000000000000000000000000000000000000000002",
      "0000000000000000000000004200000000000000000000000000000000000006",
      "00000000000000000000000050c5725949a6f0c72e6c4a641f24049a917db0cb",
    ],
  },
  payportion: {
    token: "00000000000000000000000050c5725949a6f0c72e6c4a641f24049a917db0cb",
    receipt: "000000000000000000000000067170777ba8027ced27e034102d54074d062d71",
  },

  // inputs: [
  //   "0x000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000005af3107a4000",
  //   "0x000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000005af3107a40000000000000000000000000000000000000000000000000000423bf2897c8d5f900000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002b42000000000000000000000000000000000000060001f450c5725949a6f0c72e6c4a641f24049a917db0cb000000000000000000000000000000000000000000",
  //   "0x00000000000000000000000050c5725949a6f0c72e6c4a641f24049a917db0cb000000000000000000000000067170777ba8027ced27e034102d54074d062d710000000000000000000000000000000000000000000000000000000000000019",
  //   "0x00000000000000000000000050c5725949a6f0c72e6c4a641f24049a917db0cb00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000423bf2897c8d5f9",
  // ],
};

export function getParams() {}