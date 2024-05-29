import { Hex, parseEther } from "viem";
import { Command } from "commander";

import { ProtocolParams } from "../classes/protocol";
import { Bot } from "../classes/bot";
import { uniswap as uniswapFn } from "../utils/uniswap";
import { parseCronJob } from "../libs/cron";

export const uniswap = new Command("uniswap");

uniswap
  .description("Start the uniswap protocol")
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
        chain: options.chain || "base",
        privateKey: pk,
        execution: uniswapFn,
      };

      const uniswapProtocol = new Bot(
        protocolParams,
        options.cronjob ? parseCronJob(options.cronjob) : "0 */10 * * * *",
        Number(options.delay) || 0
      );

      uniswapProtocol.execute();
    }
  );
