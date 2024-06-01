import { sendTransaction } from "../../utils/transaction";
import { UniswapParams } from "../../types/uniswap";
import { Execution } from "../../types/protocol";
import { getUniswapContract, getPrice } from "./helpers";

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
