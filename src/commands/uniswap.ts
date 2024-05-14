import { parseEther } from "viem";
import { Command } from "commander";

import { Protocol } from "../types/protocol";
import { uniswap as uniswapFn } from "../utils/uniswap";
import { parseCronJob } from "../libs/cron";

export const uniswap = new Command("uniswap");

uniswap
  .description("Start the uniswap protocol")
  .option("-p, --pk <private key>", "private key of signer")
  .option("    --amount <amount>", "amount of ETH")
  .option("-d, --delay <delay time>", "delay in minutes")
  .option(
    "-c, --cronjob <cron job...>",
    'cron job expression (every five seconds i.e. "*/5 * * * *")'
  )
  .action((options) => {
    const uniswapProtocol = new Protocol(
      uniswapFn,
      options.pk,
      parseEther(options.amount),
      parseCronJob(options.cronjob),
      Number(options.delay)
    );

    uniswapProtocol.execute();
  });
