import { zeroAddress, parseEther } from "viem";
import { AAVE, WETH } from "./utils/contracts";
import { SIGNER, SIGNER_ADDR, sendTransaction } from "./utils/clients";

async function deposit(amount: bigint) {
  const { request } = await AAVE.simulate.depositETH(
    [zeroAddress, SIGNER_ADDR, 0],
    {
      value: amount,
      account: SIGNER.account,
    }
  );
  console.log("Deposit...");
  await sendTransaction(request, SIGNER);
}

async function withdraw(amount: bigint) {
  const { request: approveReq } = await WETH.simulate.approve(
    [AAVE.address, amount],
    { account: SIGNER.account }
  );
  console.log("Approving...");
  await sendTransaction(approveReq, SIGNER);

  const { request: withdrawReq } = await AAVE.simulate.withdrawETH(
    [zeroAddress, amount, SIGNER_ADDR],
    { account: SIGNER.account }
  );
  console.log("Withdraw...");
  await sendTransaction(withdrawReq, SIGNER);
}

export async function aave() {
  const AMOUNT = parseEther("0.001");

  await deposit(AMOUNT);
  await withdraw(AMOUNT);

  console.log("Contract address", AAVE.address);
}
