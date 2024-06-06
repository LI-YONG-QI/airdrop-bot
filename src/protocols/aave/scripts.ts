import { zeroAddress, type Hex } from "viem";

import { sendTransaction } from "../../utils/transaction";
import type { Execution, ProtocolContracts } from "../../types/protocol";

type AAVEFn = (contracts: ProtocolContracts, amount: bigint) => Promise<Hex>;

const deposit: AAVEFn = async (contracts, amount) => {
  const { signer } = contracts.client;

  const { request } = await contracts.aave.simulate.depositETH(
    [zeroAddress, signer.account.address, 0],
    {
      value: amount,
      account: signer.account,
    }
  );

  console.log("Deposit...");

  const tx = await sendTransaction(contracts.client, request);
  return tx;
};

const approve: AAVEFn = async (contracts, amount) => {
  const { signer } = contracts.client;

  console.log("Enable WETH... ");
  const { request: approveReq } = await contracts.weth.simulate.approve(
    [contracts.aave.address, amount],
    { account: signer.account }
  );
  console.log("Approving...");

  const tx = await sendTransaction(contracts.client, approveReq);
  return tx;
};

const withdraw: AAVEFn = async (contracts, amount) => {
  const { signer } = contracts.client;

  const { request: withdrawReq } = await contracts.aave.simulate.withdrawETH(
    [zeroAddress, amount, signer.account.address],
    { account: signer.account }
  );
  console.log("Withdraw...");

  const tx = await sendTransaction(contracts.client, withdrawReq);
  return tx;
};

export const aave: Execution = async (contracts, amount) => {
  const txs = [] as Hex[];
  const tx1 = await deposit(contracts, amount);
  const tx2 = await approve(contracts, amount);
  const tx3 = await withdraw(contracts, amount);

  txs.push(tx1, tx2, tx3);

  return txs;
};
