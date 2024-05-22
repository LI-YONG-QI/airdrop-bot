import { sendTransaction } from "../libs/transaction";
import { UniswapParams } from "./contracts/uniswap/params";
import { UNISWAP_ROUTER, UNI_V3_POOl } from "./contracts/uniswap";
import { PUBLIC_CLIENT } from "./clients/public";
import { Interaction } from "../classes/protocol";

async function getPrice() {
  const latestBlockNumber = await PUBLIC_CLIENT.getBlockNumber();

  const logs = await UNI_V3_POOl.getEvents.Swap(undefined, {
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

export const uniswap: Interaction = async (_signer, amount) => {
  const price = await getPrice();
  const deadline = BigInt(Math.floor(Date.now() / 1000)) + BigInt(60 * 5);
  const params = new UniswapParams(BigInt(price), amount);

  const { request } = await UNISWAP_ROUTER.simulate.execute(
    [params.command, params.formatInputs(), deadline],
    {
      account: _signer.account,
      value: amount,
    }
  );

  console.log("Swap...");
  await sendTransaction(request, _signer);
};
