import { sendTransaction } from "../../utils/transaction";
import { UniswapParams } from "../../types/uniswap";
import { Execution } from "../../types/protocol";
import { getPrice } from "./helpers";

export const uniswap: Execution = async (contracts, amount) => {
  const { router, pool } = contracts;

  const price = await getPrice(pool, contracts.client.public);
  const deadline = BigInt(Math.floor(Date.now() / 1000)) + BigInt(60 * 5);
  const params = new UniswapParams(BigInt(price), amount);

  const { request } = await router.simulate.execute(
    [params.command, params.formatInputs(), deadline],
    {
      account: contracts.client.signer,
      value: amount,
    }
  );

  console.log("Swap...");
  await sendTransaction(contracts.client, request);
};
