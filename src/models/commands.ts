import { privateKeyToAccount } from "viem/accounts";
import {
  Chain,
  Hex,
  PrivateKeyAccount,
  Transport,
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
} from "viem";
import { base, sepolia } from "viem/chains";
import { Command } from "commander";

import { Bot } from "../types/bot";
import { ProtocolImpl } from "../types/protocol";
import type {
  ProtocolContracts,
  ProtocolPublicClient,
  Execution,
} from "../types/protocol";
import type { CommandActionOptions } from "../types/commands";
import { parseCronJob } from "./cron";
import { createAAVEContracts } from "../protocols/aave";
import { getUniswapContract } from "../protocols/uniswap";

const DEFAULT = {
  chain: "base" as const,
  cronjob: "0 */10 * * * *",
};

const getContractFn = (
  name: string
): ((publicClient: ProtocolPublicClient) => ProtocolContracts) => {
  switch (name) {
    case "aave":
      return createAAVEContracts;
    case "uniswap":
      return getUniswapContract;
  }

  throw new Error("Invalid protocol");
};

const createProtocol = (
  execution: Execution,
  createContract: (publicClient: ProtocolPublicClient) => ProtocolContracts,
  chain: string,
  pk: Hex,
  amount: bigint
) => {
  const config = {
    chain: chain === "base" ? base : sepolia,
    transport: http(),
  };

  const publicClient = createPublicClient<Transport, Chain>({
    ...config,
  });

  const walletClient = createWalletClient<Transport, Chain, PrivateKeyAccount>({
    account: privateKeyToAccount(pk),
    ...config,
  });

  return new ProtocolImpl(
    { public: publicClient, signer: walletClient },
    createContract(publicClient),
    execution,
    amount
  );
};

const commandAction = (
  name: string,
  fn: Execution,
  pk: Hex,
  amount: string,
  options: CommandActionOptions
) => {
  const contractFn = getContractFn(name);

  const protocol = createProtocol(
    fn,
    contractFn,
    options.chain || DEFAULT.chain,
    pk,
    parseEther(amount)
  );

  const bot = new Bot(
    protocol,
    Number(options.delay) || 0,
    options.cronjob ? parseCronJob(options.cronjob) : DEFAULT.cronjob
  );

  bot.execute();
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
    .action(commandAction.bind(null, name, fn));
};
