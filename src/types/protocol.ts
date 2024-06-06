import type {
  Chain,
  WalletClient,
  PublicClient,
  GetContractReturnType,
  Abi,
  PrivateKeyAccount,
} from "viem";
import { AAVE_ABI, WETH_ABI } from "../utils/abis";

type Contract<T extends Abi> = GetContractReturnType<
  T,
  { public: PublicClient }
>;

export type ProtocolPublicClient = PublicClient & { chain: Chain };

export type ProtocolWalletClient = WalletClient & {
  account: PrivateKeyAccount;
  chain: Chain;
};

export type Protocol = {
  execution: ProtocolExecution;
  publicClient: ProtocolPublicClient;
  signer: ProtocolWalletClient;
};

export type ProtocolContracts = {
  client: { public: ProtocolPublicClient; signer: ProtocolWalletClient };
  weth: Contract<typeof WETH_ABI>;
  aave: Contract<typeof AAVE_ABI>;
};

export type Execution = (
  contracts: ProtocolContracts,
  amount: bigint
) => Promise<void>;

export type ProtocolExecution = () => Promise<void>;

export class ProtocolImpl implements Protocol {
  public execution: ProtocolExecution;

  constructor(
    public publicClient: ProtocolPublicClient,
    public signer: ProtocolWalletClient,
    createContract: (
      publicClient_: ProtocolPublicClient,
      signer_: ProtocolWalletClient
    ) => ProtocolContracts,
    _execution: Execution,
    amount: bigint
  ) {
    const contracts = createContract(this.publicClient, this.signer);
    this.execution = this.createExecution(_execution, contracts, amount);
  }

  private createExecution(
    execution: Execution,
    _contracts: ProtocolContracts,
    _amount: bigint
  ): () => Promise<void> {
    return execution.bind(null, _contracts, _amount);
  }
}
