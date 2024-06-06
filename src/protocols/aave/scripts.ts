import { zeroAddress } from "viem";

import { sendTransaction } from "../../utils/transaction";
import type { Execution, ProtocolContracts } from "../../types/protocol";

type AAVEFn = (contracts: ProtocolContracts, amount: bigint) => Promise<void>;

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

  await sendTransaction(contracts.client, request);
};

const withdraw: AAVEFn = async (contracts, amount) => {
  const { signer } = contracts.client;

  console.log("Enable WETH... ");
  const { request: approveReq } = await contracts.weth.simulate.approve(
    [contracts.aave.address, amount],
    { account: signer.account }
  );
  console.log("Approving...");
  await sendTransaction(contracts.client, approveReq);

  const { request: withdrawReq } = await contracts.aave.simulate.withdrawETH(
    [zeroAddress, amount, signer.account.address],
    { account: signer.account }
  );
  console.log("Withdraw...");
  await sendTransaction(contracts.client, withdrawReq);
};

export const aave: Execution = async (contracts, amount) => {
  await deposit(contracts, amount);
  await withdraw(contracts, amount);
};
