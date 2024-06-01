import {
  WalletClient,
  PrivateKeyAccount,
  Transport,
  Chain,
  GetContractReturnType,
  PublicClient,
  Abi,
} from "viem";

import { AAVE_ABI, WETH_ABI } from "../utils/abis";

type Contract<T extends Abi> = GetContractReturnType<
  T,
  { public: PublicClient }
>;

export type AAVEContract = {
  public: PublicClient;
  weth: Contract<typeof WETH_ABI>;
  aave: Contract<typeof AAVE_ABI>;
};

export type AAVEFn = (
  contracts: AAVEContract,
  signer: WalletClient<Transport, Chain, PrivateKeyAccount>,
  amount: bigint
) => Promise<void>;
