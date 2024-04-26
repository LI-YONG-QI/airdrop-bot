import { WalletClient } from "viem";
import { PUBLIC_CLIENT } from "./clients/public";

export async function sendTransaction(request: any, signer: WalletClient) {
  const hash = await signer.writeContract(request);
  const transaction = await PUBLIC_CLIENT.waitForTransactionReceipt({
    confirmations: 2,
    hash,
  });

  console.log(
    `Tx Hash: ${transaction.transactionHash} - ${transaction.status}`
  );
}
