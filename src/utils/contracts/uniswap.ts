import { Address, getContract } from "viem";
import { UNISWAP_ROUTER_ABI } from "./abis";
import { PUBLIC_CLIENT } from "../clients/public";

export const UNISWAP_ROUTER = getContract({
  address: process.env.UNISWAP_ROUTER as Address,
  abi: UNISWAP_ROUTER_ABI,
  client: { public: PUBLIC_CLIENT },
});
