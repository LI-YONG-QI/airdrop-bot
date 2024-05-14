import { parseEther } from "viem";
import { Command } from "commander";

import { Protocol } from "../types/protocol";
import { aave as aaveFn } from "../utils/aave";
import { parseCronJob } from "../libs/cron";

export const aave = new Command("aave");

aave
  .description("Start the aave protocol")
  .option("-p, --pk <private key>", "private key of signer")
  .option("    --amount <amount>", "amount of ETH")
  .option("-d, --delay <delay time>", "delay in minutes")
  .option(
    "-c, --cronjob <cron job...>",
    'cron job expression i.e. "*/5 * * * *"'
  )
  .action((options) => {
    const aaveProtocol = new Protocol(
      aaveFn,
      options.pk,
      parseEther(options.amount),
      parseCronJob(options.cronjob),
      Number(options.delay)
    );

    aaveProtocol.execute();
  });
