import { uniswapParams2 } from "./utils/data";
import {
  createPublicClient,
  encodePacked,
  getContract,
  http,
  parseEther,
} from "viem";
import { SIGNER } from "./utils/clients/wallet";
import { UNISWAP_ROUTER, UNI_V3_POOl } from "./utils/contracts/uniswap";
import { sendTransaction } from "./utils/transaction";
import { base } from "viem/chains";
import { ERC20_ABI, UNI_V3_POOL_ABI } from "./utils/contracts/abis";
import { PUBLIC_CLIENT } from "./utils/clients/public";
import { log } from "console";
import { UNI_V3_POOL_ADDR } from "./utils/contracts/constants";
import { get } from "http";

const params = uniswapParams2;

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
  // console.log("Swap started !!");

  // const deadline = BigInt(Math.floor(Date.now() / 1000)) + BigInt(60 * 5);

  // const { request } = await UNISWAP_ROUTER.simulate.execute(
  //   [
  //     params.command as `0x${string}`,
  //     params.inputs as `0x${string}`[],
  //     deadline,
  //   ],
  //   {
  //     account: SIGNER.account,
  //     value: parseEther("0.0001"),
  //   }
  // );

  // console.log(request);

  // console.log("Swap...");
  //await sendTransaction(request, SIGNER);

  const price = await getPrice();
  console.log(price);
  const i = encodePacked(["uint256"], [BigInt(1)]);
  console.log(i);
}

uniswap();
