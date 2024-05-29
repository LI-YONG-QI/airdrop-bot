import { zeroAddress } from "viem";

import { sendTransaction } from "../libs/transaction";
import { Execution } from "../classes/protocol";
import { AAVEFn } from "../classes/aave";
import { createAAVEContracts } from "./contracts/aave";

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

export const aave: Execution = async (_publicClient, _signer, _amount) => {
  const contracts = createAAVEContracts(_publicClient);

  await deposit(contracts, _signer, _amount);
  await withdraw(contracts, _signer, _amount);
};
