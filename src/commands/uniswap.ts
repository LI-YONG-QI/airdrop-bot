import { Hex, parseEther } from "viem";
import { Command } from "commander";

import { ProtocolParams } from "../classes/protocol";
import { Bot } from "../classes/bot";
import { uniswap as uniswapFn } from "../utils/uniswap";
import { parseCronJob } from "../libs/cron";

export const uniswap = new Command("uniswap");

uniswap
  .description("Start the uniswap protocol")
  .option("-p, --pk <private key>", "private key of signer")
  .option("    --amount <amount>", "amount of ETH")
  .option("-d, --delay [delay time]", "delay in minutes (default: 0)")
  .option("    --chain [chain name]", "[base | sepolia] (default: base)")
  .option(
    "-c, --cronjob [cron job...]",
    'cron job expression (default: "* */10 * * * *" every 10 minutes)'
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
        chain: options.chain,
        privateKey: options.pk,
        execution: uniswapFn,
      };

      const uniswapProtocol = new Bot(
        protocolParams,
        parseCronJob(options.cronjob),
        Number(options.delay)
      );

      uniswapProtocol.execute();
    }
  );
