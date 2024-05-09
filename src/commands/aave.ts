import { parseEther } from "viem";
import { Command } from "commander";

import { Protocol } from "@/types/protocol";
import { aave as aaveFn } from "@/utils/aave";

export const aave = new Command("aave");

aave
  .description("Start the aave protocol")
  .option("-p, --pk <private key>", "private key of signer")
  .option("    --amount <amount>", "amount of ETH")
  .option("-d, --delay <delay time>", "delay in minutes")
  .action((options) => {
    const cronTab = process.env.CRONJOB || "* * * * * *";

    const aaveProtocol = new Protocol(
      aaveFn,
      options.pk,
      parseEther(options.amount),
      cronTab,
      Number(options.delay)
    );

    aaveProtocol.execute();
  });
