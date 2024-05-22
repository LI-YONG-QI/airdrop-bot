import {
  Address,
  Chain,
  GetContractReturnType,
  PublicClient,
  Transport,
  getContract,
} from "viem";

import { sendTransaction } from "../libs/transaction";
import { UniswapParams } from "./contracts/uniswap/params";
import { Execution } from "../classes/protocol";
import { UNISWAP_ROUTER_ABI, UNI_V3_POOL_ABI } from "./contracts/abis";

function getUniswapContractAddress(chain: string): {
  router: Address;
  pool: Address;
} {
  switch (chain) {
    case "base":
      return {
        router: "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
        pool: "0x93e8542E6CA0eFFfb9D57a270b76712b968A38f5",
      };
  }

  throw new Error("Invalid chain");
}

function getUniswapContract(publicClient: PublicClient<Transport, Chain>) {
  const address = getUniswapContractAddress(publicClient.chain.name);

  return {
    router: getContract({
      address: address.router,
      abi: UNISWAP_ROUTER_ABI,
      client: { public: publicClient },
    }),

    pool: getContract({
      address: address.pool,
      abi: UNI_V3_POOL_ABI,
      client: { public: publicClient },
    }),
  };
}

async function getPrice(
  pool: GetContractReturnType<typeof UNI_V3_POOL_ABI, { public: PublicClient }>,
  client: PublicClient
) {
  const latestBlockNumber = await client.getBlockNumber();
  const logs = await pool.getEvents.Swap(undefined, {
    fromBlock: latestBlockNumber - BigInt(100),
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

export const uniswap: Execution = async (publicClient, _signer, amount) => {
  const { router, pool } = getUniswapContract(publicClient);

  const price = await getPrice(pool, publicClient);
  const deadline = BigInt(Math.floor(Date.now() / 1000)) + BigInt(60 * 5);
  const params = new UniswapParams(BigInt(price), amount);

  const { request } = await router.simulate.execute(
    [params.command, params.formatInputs(), deadline],
    {
      account: _signer.account,
      value: amount,
    }
  );

  console.log("Swap...");
  await sendTransaction(publicClient, request, _signer);
};
