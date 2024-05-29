import { Hex, parseEther } from "viem";
import { Command } from "commander";

import { Bot } from "../classes/bot";
import { aave as aaveFn } from "../utils/aave";
import { parseCronJob } from "../libs/cron";
import { ProtocolParams } from "../classes/protocol";

export const aave = new Command("aave");

aave
  .description("Start the aave protocol")
  .option("-p, --pk <private key>", "private key of signer")
  .option("    --amount <amount>", "amount of ETH")
  .option("-d, --delay [delay time]", "delay in minutes (default: 0)")
  .option("    --chain [chain name]", "[base | sepolia] (default: base)")
  .option(
    "-c, --cronjob [cron job...]",
    'cron job expression (default: "0 */10 * * * *" every 10 minutes)'
  )
  .action(
    (options: {
      pk: Hex;
      amount: string;
      chain: "base" | "sepolia";
      cronjob: string[];
      delay: string;
    }) => {
      const protocolParams: ProtocolParams = {
        amount: parseEther(options.amount),
        privateKey: options.pk,
        chain: options.chain || "base",
        execution: aaveFn,
      };

      const aaveProtocol = new Bot(
        protocolParams,
        options.cronjob ? parseCronJob(options.cronjob) : "0 */10 * * * *",
        Number(options.delay) || 0
      );

      aaveProtocol.execute();
    }
  );
