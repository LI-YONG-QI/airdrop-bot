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
  .option("-d, --delay [delay time]", "delay in minutes (default: 0)")
  .option("    --chain [chain name]", "[base | sepolia] (default: base)")
  .option(
    "-c, --cronjob [cron job...]",
    'cron job expression (default: "* */10 * * * *" every 10 minutes)'
  )
  .action((options) => {
    const aaveProtocol = new Protocol(
      options.pk,
      options.chain || "base",
      aaveFn,
      parseEther(options.amount),
      parseCronJob(options.cronjob),
      Number(options.delay) || 0
    );

    aaveProtocol.execute();
  });
