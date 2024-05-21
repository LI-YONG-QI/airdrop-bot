import {
  zeroAddress,
  WalletClient,
  PrivateKeyAccount,
  Transport,
  Chain,
  GetContractReturnType,
  createPublicClient,
  getContract,
  PublicClient,
  Address,
} from "viem";

import { sendTransaction } from "../libs/transaction";
import { Interaction } from "../types/protocol";
import { AAVE_ABI, WETH_ABI } from "./contracts/abis";

type AAVEContract = {
  public: PublicClient;
  weth: GetContractReturnType<typeof WETH_ABI, { public: PublicClient }>;
  aave: GetContractReturnType<typeof AAVE_ABI, { public: PublicClient }>;
};

type AAVEFn = (
  contracts: AAVEContract,
  signer: WalletClient<Transport, Chain, PrivateKeyAccount>,
  amount: bigint
) => Promise<void>;

const deposit: AAVEFn = async (contracts, signer, amount) => {
  const { account } = signer;

  const { request } = await contracts.aave.simulate.depositETH(
    [zeroAddress, account.address, 0],
    {
      value: amount,
      account,
    }
  );
  console.log("Deposit...");
  await sendTransaction(contracts.public, request, signer);
};

const withdraw: AAVEFn = async (contracts, signer, amount) => {
  const { account } = signer;
  const { request: approveReq } = await contracts.weth.simulate.approve(
    [contracts.aave.address, amount],
    { account: account }
  );
  console.log("Approving...");
  await sendTransaction(contracts.public, approveReq, signer);

  const { request: withdrawReq } = await contracts.aave.simulate.withdrawETH(
    [zeroAddress, amount, account.address],
    { account: account }
  );
  console.log("Withdraw...");
  await sendTransaction(contracts.public, withdrawReq, signer);
};

const getAaveAddress = (chain: string): Address => {
  switch (chain) {
    case "base":
      return "0x8be473dCfA93132658821E67CbEB684ec8Ea2E74";
    case "sepolia":
      return "0x387d311e47e80b498169e6fb51d3193167d89F7D";
  }

  throw new Error("Invalid chain");
};

const getWethAddress = (chain: string): Address => {
  switch (chain) {
    case "base":
      return "0xD4a0e0b9149BCee3C920d2E00b5dE09138fd8bb7";
    case "sepolia":
      return "0x5b071b590a59395fE4025A0Ccc1FcC931AAc1830";
  }

  throw new Error("Invalid chain");
};

const createAAVEContract = (publicClient: PublicClient<Transport, Chain>) => {
  return getContract({
    address: getAaveAddress(publicClient.chain.name),
    abi: AAVE_ABI,
    client: { public: publicClient },
  });
};

const createWETHContract = (publicClient: PublicClient<Transport, Chain>) => {
  return getContract({
    address: getWethAddress(publicClient.chain.name),
    abi: WETH_ABI,
    client: { public: publicClient },
  });
};

export const aave: Interaction = async (config, _signer, amount) => {
  const publicClient = createPublicClient<Transport, Chain>(config);

  const aave = createAAVEContract(publicClient);
  const weth = createWETHContract(publicClient);
  const contracts = { public: publicClient, aave, weth };

  await deposit(contracts, _signer, amount);
  await withdraw(contracts, _signer, amount);
};
