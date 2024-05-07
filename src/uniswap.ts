import { UniswapParams } from "./utils/data";
import { parseEther } from "viem";
import { SIGNER } from "./utils/clients/wallet";
import { UNISWAP_ROUTER, UNI_V3_POOl } from "./utils/contracts/uniswap";
import { sendTransaction } from "./utils/transaction";
import { PUBLIC_CLIENT } from "./utils/clients/public";

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

export async function uniswap() {
  const price = await getPrice();
  const deadline = BigInt(Math.floor(Date.now() / 1000)) + BigInt(60 * 5);
  const t = new UniswapParams(price, parseEther("0.0001"));

  const { request } = await UNISWAP_ROUTER.simulate.execute(
    [t.command, t.formatInputs(), deadline],
    {
      account: SIGNER.account,
      value: parseEther("0.0001"),
    }
  );

  console.log(request);
  console.log("Swap...");
  await sendTransaction(request, SIGNER);
}

uniswap();
