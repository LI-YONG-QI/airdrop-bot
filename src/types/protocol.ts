import { CronJob } from "cron";
import {
  Chain,
  Hex,
  PrivateKeyAccount,
  Transport,
  WalletClient,
  createWalletClient,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";

import { createConfig } from "../libs/cron";
import { CONFIG } from "../utils/clients/config";

export type Interaction = (
  _signer: WalletClient<Transport, Chain, PrivateKeyAccount>,
  amount: bigint
) => Promise<void>;

export class Protocol {
  public cron: CronJob;
  private signer: WalletClient;

  constructor(
    interaction: Interaction,
    privateKey: Hex,
    public amount: bigint,
    public cronTime: string = "* * * * * *",
    public delay: number = 0
  ) {
    const _signer = this.setSigner(privateKey);
    const _interaction = interaction.bind(null, _signer, amount);

    const config = createConfig(_interaction, cronTime, delay);

    this.cron = new CronJob(
      config.cronTime,
      config.onTick,
      null,
      config.start,
      config.timeZone
    );
  }

  execute() {
    console.log(`Starting app ...`);
    console.log(`Time ${this.cronTime} | Delay ${this.delay} minutes`);
    console.log(`Account ${this.signer.account?.address}`);
    this.cron.start();
  }

  getSigner() {
    return this.signer;
  }

  private setSigner(privateKey: Hex) {
    const account = privateKeyToAccount(privateKey);
    const _signer = createWalletClient({
      account,
      ...CONFIG,
    });

    this.signer = _signer;

    return _signer;
  }
}
