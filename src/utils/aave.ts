import {
  zeroAddress,
  WalletClient,
  PrivateKeyAccount,
  Transport,
  Chain,
} from "viem";

import { sendTransaction } from "../libs/transaction";
import { AAVE, WETH } from "./contracts/aave";
import { Interaction } from "../types/protocol";

async function deposit(
  signer: WalletClient<Transport, Chain, PrivateKeyAccount>,
  amount: bigint
) {
  const { account } = signer;

  const { request } = await AAVE.simulate.depositETH(
    [zeroAddress, account.address, 0],
    {
      value: amount,
      account,
    }
  );
  console.log("Deposit...");
  await sendTransaction(request, signer);
}

async function withdraw(
  signer: WalletClient<Transport, Chain, PrivateKeyAccount>,
  amount: bigint
) {
  const { account } = signer;
  const { request: approveReq } = await WETH.simulate.approve(
    [AAVE.address, amount],
    { account: account }
  );
  console.log("Approving...");
  await sendTransaction(approveReq, signer);

  const { request: withdrawReq } = await AAVE.simulate.withdrawETH(
    [zeroAddress, amount, account.address],
    { account: account }
  );
  console.log("Withdraw...");
  await sendTransaction(withdrawReq, signer);
}

export const aave: Interaction = async (_signer, amount) => {
  await deposit(_signer, amount);
  await withdraw(_signer, amount);
};
