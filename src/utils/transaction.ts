import { WalletClient } from "viem";
import { PUBLIC_CLIENT } from "./clients/public";

export async function sendTransaction(request: any, signer: WalletClient) {
  while (1) {
    const hash = await signer.writeContract(request);
    const transaction = await PUBLIC_CLIENT.waitForTransactionReceipt({
      confirmations: 5,
      hash,
      pollingInterval: 12_000,
    });

    console.log(
      `Tx Hash: ${transaction.transactionHash} - ${transaction.status}`
    );

    if (transaction.status === "success") break;

    console.log("Reverted !! Retrying...");
  }
}
