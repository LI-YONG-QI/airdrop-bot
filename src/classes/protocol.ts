import {
  Hex,
  PrivateKeyAccount,
  Transport,
  Chain as viemChain,
  WalletClient,
  createWalletClient,
  ClientConfig,
  http,
  PublicClient,
  createPublicClient,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, sepolia } from "viem/chains";

type Chain = "base" | "sepolia";

export type Execution = (
  publicClient: PublicClient<Transport, viemChain>,
  signer: WalletClient<Transport, viemChain, PrivateKeyAccount>,
  amount: bigint
) => Promise<void>;

export type ProtocolExecution = () => Promise<void>;

export type ProtocolParams = {
  privateKey: Hex;
  chain: Chain;
  amount: bigint;
  execution: Execution;
};
export class Protocol {
  public execution: ProtocolExecution;
  public publicClient: PublicClient;
  public signer: WalletClient;

  constructor(params: ProtocolParams) {
    const { privateKey, chain, amount, execution } = params;

    const config = this.createClientConfig(chain);
    const _publicClient = this.setPublicClient(config);
    const _signer = this.setSigner(config, privateKey);

    this.execution = this.createExecution(
      execution,
      _publicClient,
      _signer,
      amount
    );
  }

  private setPublicClient(config: ClientConfig) {
    const _publicClient = createPublicClient<Transport, viemChain>(config);
    this.publicClient = _publicClient;
    return _publicClient;
  }

  setSigner(config: ClientConfig, privateKey: Hex) {
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

  createClientConfig(chain: Chain): ClientConfig {
    const _chain = chain === "base" ? base : sepolia;
    return {
      chain: _chain,
      transport: http(),
    };
  }

  createExecution(
    execution: Execution,
    _publicClient: PublicClient<Transport, viemChain>,
    _signer: WalletClient<Transport, viemChain, PrivateKeyAccount>,
    _amount: bigint
  ): () => Promise<void> {
    return execution.bind(null, _publicClient, _signer, _amount);
  }
}
