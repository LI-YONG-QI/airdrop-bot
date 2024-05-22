import {
  WalletClient,
  PrivateKeyAccount,
  Transport,
  Chain,
  GetContractReturnType,
  PublicClient,
} from "viem";

import { AAVE_ABI, WETH_ABI } from "../utils/contracts/abis";

export type AAVEContract = {
  public: PublicClient;
  weth: GetContractReturnType<typeof WETH_ABI, { public: PublicClient }>;
  aave: GetContractReturnType<typeof AAVE_ABI, { public: PublicClient }>;
};

export type AAVEFn = (
  contracts: AAVEContract,
  signer: WalletClient<Transport, Chain, PrivateKeyAccount>,
  amount: bigint
) => Promise<void>;
