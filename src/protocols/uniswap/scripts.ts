import { sendTransaction } from "../../utils/transaction";
import { UniswapParams } from "../../types/uniswap";
import { Execution } from "../../types/protocol";
import { getPrice } from "./helpers";
import { Abi, getContract } from "viem";
import { UNI_V3_POOL_ABI } from "../../utils/abis";

const checkAbi = (abi: Abi): abi is typeof UNI_V3_POOL_ABI => {
  return abi === UNI_V3_POOL_ABI;
};

export const uniswap: Execution = async (clients, contracts, amount) => {
  const { abi } = contracts.pool;

  if (!checkAbi(abi)) throw new Error("Invalid ABI");

  const pool = getContract({
    address: contracts["pool"].address,
    abi,
    client: { public: clients.public },
  });

  const price = await getPrice(pool, clients.public);
  const deadline = BigInt(Math.floor(Date.now() / 1000)) + BigInt(60 * 5);
  const params = new UniswapParams(BigInt(price), amount);

  const { request } = await clients.public.simulateContract({
    ...contracts["router"],
    functionName: "execute",
    args: [params.command, params.formatInputs(), deadline],
    account: clients.signer.account,
    value: amount,
  });

  console.log("Swap...");
  return [await sendTransaction(clients, request)];
};
