import { AAVE_ABI, WETH_ABI } from "./abis";
import { Address, getContract } from "viem";
import { PUBLIC_CLIENT } from "../clients/public";

const AAVE_ADDR = process.env.AAVE as Address;
const WETH_ADDR = process.env.WETH as Address;

export const AAVE = getContract({
  address: AAVE_ADDR,
  abi: AAVE_ABI,
  client: { public: PUBLIC_CLIENT },
});

export const WETH = getContract({
  address: WETH_ADDR,
  abi: WETH_ABI,
  client: { public: PUBLIC_CLIENT },
});
