import { Hex, parseEther } from "viem";
import { Command } from "commander";

import { Bot } from "../types/bot";
import type { Execution, ProtocolParams } from "../types/protocol";
import type { CommandActionOptions } from "../types/commands";
import { parseCronJob } from "./cron";

const DEFAULT = {
  chain: "base" as const,
  cronjob: "0 */10 * * * *",
};

const commandAction = (
  fn: Execution,
  pk: Hex,
  amount: string,
  options: CommandActionOptions
) => {
  const protocolParams: ProtocolParams = {
    amount: parseEther(amount),
    privateKey: pk,
    chain: options.chain || DEFAULT.chain,
    execution: fn,
  };

  const protocol = new Bot(
    protocolParams,
    options.cronjob ? parseCronJob(options.cronjob) : DEFAULT.cronjob,
    Number(options.delay) || 0
  );

  protocol.execute();
};

export const createProtocolCommand = (name: string, fn: Execution) => {
  return new Command(name)
    .description(`Start the ${name} protocol`)
    .argument("<pk>", "private key of signer")
    .argument("<amount>", "amount of ETH")
    .option(
      "-c, --cronjob [cron job...]",
      'cron job expression (default: "* */10 * * * *" every 10 minutes)'
    )
    .option("    --chain [chain name]", "[base | sepolia] (default: base)")
    .option("-d, --delay [delay time]", "delay in minutes (default: 0)")
    .action(commandAction.bind(null, fn));
};
