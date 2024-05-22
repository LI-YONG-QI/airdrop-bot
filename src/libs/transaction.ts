import { PublicClient, WalletClient } from "viem";

export async function sendTransaction(
  client: PublicClient,
  request: any,
  signer: WalletClient
) {
  while (1) {
    const hash = await signer.writeContract(request);
    const transaction = await client.waitForTransactionReceipt({
      confirmations: 5,
      hash,
      pollingInterval: 12000,
    });

    console.log(
      `Tx Hash: ${transaction.transactionHash} - ${transaction.status}`
    );

    if (transaction.status === "success") break;

    console.log("Reverted !! Retrying...");
  }
}
