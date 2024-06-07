import { zeroAddress, type Hex } from "viem";

import { sendTransaction } from "../../utils/transaction";
import type {
  Execution,
  ProtocolContracts,
  ProtocolClients,
} from "../../types/protocol";

type AAVEFn = (
  client: ProtocolClients,
  contracts: ProtocolContracts,
  amount: bigint
) => Promise<Hex>;

const deposit: AAVEFn = async (clients, contracts, amount) => {
  const { signer, public: publicClient } = clients;

  const { request } = await publicClient.simulateContract({
    ...contracts["aave"],
    functionName: "depositETH",
    args: [zeroAddress, signer.account.address, 0],
    account: signer.account,
    value: amount,
  });

  console.log("Deposit...");

  const tx = await sendTransaction(clients, request);
  return tx;
};

const approve: AAVEFn = async (clients, contracts, amount) => {
  const { signer } = clients;

  const { request } = await clients.public.simulateContract({
    ...contracts["weth"],
    functionName: "approve",
    args: [contracts.aave.address, amount],
    account: signer.account,
  });

  console.log("Approving...");

  const tx = await sendTransaction(clients, request);
  return tx;
};

const withdraw: AAVEFn = async (clients, contracts, amount) => {
  const { signer } = clients;

  const { request } = await clients.public.simulateContract({
    ...contracts["aave"],
    functionName: "withdrawETH",
    args: [zeroAddress, amount, signer.account.address],
    account: signer.account,
  });

  console.log("Withdraw...");

  const tx = await sendTransaction(clients, request);
  return tx;
};

export const aave: Execution = async (clients, contracts, amount) => {
  const txs = [] as Hex[];
  const tx1 = await deposit(clients, contracts, amount);
  const tx2 = await approve(clients, contracts, amount);
  const tx3 = await withdraw(clients, contracts, amount);

  txs.push(tx1, tx2, tx3);

  return txs;
};
