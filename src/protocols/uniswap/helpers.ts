import { Address, GetContractReturnType, PublicClient } from "viem";

import { UNISWAP_ROUTER_ABI, UNI_V3_POOL_ABI } from "../../utils/abis";
import { ProtocolPublicClient } from "../../types/protocol";

export function getUniswapContractAddress(chain: string): {
  router: Address;
  pool: Address;
} {
  switch (chain) {
    case "Base":
      return {
        router: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
        pool: "0x93e8542E6CA0eFFfb9D57a270b76712b968A38f5",
      };
  }

  throw new Error("Invalid chain");
}

export function getUniswapContract(publicClient: ProtocolPublicClient) {
  const address = getUniswapContractAddress(publicClient.chain.name);

  return {
    router: {
      address: address.router,
      abi: UNISWAP_ROUTER_ABI,
    },

    pool: { address: address.pool, abi: UNI_V3_POOL_ABI },
  };
}

export async function getPrice(
  pool: GetContractReturnType<typeof UNI_V3_POOL_ABI, { public: PublicClient }>,
  client: PublicClient
) {
  const latestBlockNumber = await client.getBlockNumber();

  //! Maybe not get price
  const logs = await pool.getEvents.Swap(undefined, {
    fromBlock: latestBlockNumber - BigInt(1000),
    toBlock: latestBlockNumber,
  });

  const { args } = logs[logs.length - 1];

  let { amount0, amount1 } = args;

  if (amount0 && amount1) {
    if (amount0 < BigInt(1)) amount0 = amount0 * BigInt(-1);
    if (amount1 < BigInt(1)) amount1 = amount1 * BigInt(-1);

    return amount1 / amount0;
  }

  throw new Error("No price found");
}
