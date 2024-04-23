import { AAVE_ABI, ATOKEN_ABI } from "./abis";
import { Address, getContract } from "viem";
import { PUBLIC_CLIENT } from "./clients";

const AAVE_ADDR = process.env.AAVE as Address;
const ATOKEN_ADDR = process.env.ATOKEN as Address;

export const AAVE = getContract({
  address: AAVE_ADDR,
  abi: AAVE_ABI,
  client: { public: PUBLIC_CLIENT },
});

export const ATOKEN = getContract({
  address: ATOKEN_ADDR,
  abi: ATOKEN_ABI,
  client: { public: PUBLIC_CLIENT },
});
