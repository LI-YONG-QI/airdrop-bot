import type {
  Chain,
  WalletClient,
  PublicClient,
  Abi,
  PrivateKeyAccount,
  Hex,
  Address,
} from "viem";

export type ProtocolPublicClient = PublicClient & { chain: Chain };

export type ProtocolWalletClient = WalletClient & {
  account: PrivateKeyAccount;
  chain: Chain;
};

export type Protocol = {
  execution: ProtocolExecution;
  clients: ProtocolClients;
};

export type ProtocolContracts = {
  [k in string]: {
    address: Address;
    abi: Abi;
  };
};

export type ProtocolClients = {
  public: ProtocolPublicClient;
  signer: ProtocolWalletClient;
};

export type Execution = (
  clients: ProtocolClients,
  contracts: ProtocolContracts,
  amount: bigint
) => Promise<Hex[]>;

export type ProtocolExecution = () => Promise<Hex[]>;

export class ProtocolImpl implements Protocol {
  public execution: ProtocolExecution;

  constructor(
    public clients: ProtocolClients,
    public contracts: ProtocolContracts,
    _execution: Execution,
    amount: bigint
  ) {
    //const contracts = createContract(this.publicClient, this.signer);
    this.execution = this.createExecution(
      _execution,
      clients,
      contracts,
      amount
    );
  }

  private createExecution(
    execution: Execution,
    _clients: ProtocolClients,
    _contracts: ProtocolContracts,
    _amount: bigint
  ) {
    return execution.bind(null, _clients, _contracts, _amount);
  }
}
