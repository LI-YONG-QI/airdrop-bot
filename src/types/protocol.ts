import { CronJob } from "cron";
import {
  Hex,
  PrivateKeyAccount,
  Transport,
  Chain as viemChain,
  WalletClient,
  createWalletClient,
  ClientConfig,
  http,
  PublicClientConfig,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, sepolia } from "viem/chains";

import { createCronConfig } from "../libs/cron";

export type Interaction = (
  config: PublicClientConfig<Transport, viemChain>,
  signer: WalletClient<Transport, viemChain, PrivateKeyAccount>,
  amount: bigint
) => Promise<void>;

type Chain = "base" | "sepolia";

function createInteraction(
  main: Interaction,
  clientConfig: ClientConfig,
  _signer: WalletClient<Transport, viemChain, PrivateKeyAccount>,
  _amount: bigint
): () => Promise<void> {
  return main.bind(null, clientConfig, _signer, _amount);
}

function createClientConfig(chain: Chain): ClientConfig<Transport, viemChain> {
  const _chain = chain === "base" ? base : sepolia;
  return {
    chain: _chain,
    transport: http(),
  };
}

export class Protocol {
  public cron: CronJob;
  public clientConfig: ClientConfig;
  private signer: WalletClient;

  constructor(
    privateKey: Hex,
    chain: Chain,
    interaction: Interaction,
    public amount: bigint,
    public cronTime: string,
    public delay: number = 0
  ) {
    const _clientConfig = this.setClientConfig(chain);
    const _signer = this.setSigner(_clientConfig, privateKey);
    const _interaction = createInteraction(
      interaction,
      _clientConfig,
      _signer,
      amount
    );

    const config = createCronConfig(_interaction, cronTime, delay);
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

  private setSigner(
    config: ClientConfig<Transport, viemChain>,
    privateKey: Hex
  ) {
    const account = privateKeyToAccount(privateKey);
    const _signer = createWalletClient<Transport, viemChain, PrivateKeyAccount>(
      {
        account,
        ...config,
      }
    );

    this.signer = _signer;
    return _signer;
  }

  private setClientConfig(chain: Chain) {
    const config = createClientConfig(chain);
    return config;
  }
}
