import { parseEther } from "viem";
import { Command } from "commander";

import { Protocol } from "../types/protocol";
import { uniswap as uniswapFn } from "../utils/uniswap";

export const uniswap = new Command("uniswap");

uniswap
  .description("Start the uniswap protocol")
  .option("-p, --pk <private key>", "private key of signer")
  .option("    --amount <amount>", "amount of ETH")
  .option("-d, --delay <delay time>", "delay in minutes")
  .action((options) => {
    const cronTab = process.env.CRONJOB || "* * * * * *";

    const uniswapProtocol = new Protocol(
      uniswapFn,
      options.pk,
      parseEther(options.amount),
      cronTab,
      Number(options.delay)
    );

    uniswapProtocol.execute();
  });
