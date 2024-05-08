import { getContract } from "viem";

import { AAVE_ABI, WETH_ABI } from "@/utils/contracts/abis";
import { PUBLIC_CLIENT } from "@/utils/clients/public";
import { AAVE_ADDR, WETH_ADDR } from "@/utils/contracts/constants";

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
