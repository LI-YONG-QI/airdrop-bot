import { Hex, parseEther } from "viem";
import { Command } from "commander";

import { Bot } from "../classes/bot";
import { aave as aaveFn } from "../utils/aave";
import { parseCronJob } from "../libs/cron";
import { ProtocolParams } from "../classes/protocol";

export const aave = new Command("aave");

aave
  .description("Start the aave protocol")
  .argument("<pk>", "private key of signer")
  .argument("<amount>", "amount of ETH")
  .option(
    "-c, --cronjob [cron job...]",
    'cron job expression (default: "* */10 * * * *" every 10 minutes)'
  )
  .option("    --chain [chain name]", "[base | sepolia] (default: base)")
  .option("-d, --delay [delay time]", "delay in minutes (default: 0)")
  .action(
    (pk: Hex, amount: string, options: {
      chain: "base" | "sepolia";
      cronjob: string[];
      delay: string;
    }) => {
      const protocolParams: ProtocolParams = {
        amount: parseEther(amount),
        privateKey: pk,
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
