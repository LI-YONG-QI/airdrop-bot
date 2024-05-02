import { Address, getContract } from "viem";
import { UNISWAP_ROUTER_ABI, UNI_V3_POOL_ABI } from "./abis";
import { PUBLIC_CLIENT } from "../clients/public";
import { UNISWAP_ROUTER_ADDR, UNI_V3_POOL_ADDR } from "./constants";

import * as dotenv from "dotenv";
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
});

export const UNISWAP_ROUTER = getContract({
  address: UNISWAP_ROUTER_ADDR as Address,
  abi: UNISWAP_ROUTER_ABI,
  client: { public: PUBLIC_CLIENT },
});

export const UNI_V3_POOl = getContract({
  address: UNI_V3_POOL_ADDR,
  abi: UNI_V3_POOL_ABI,
  client: { public: PUBLIC_CLIENT },
});
