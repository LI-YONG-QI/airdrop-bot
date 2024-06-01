import type { PublicClient, WalletClient, WriteContractParameters } from "viem";

export async function sendTransaction(
  client: PublicClient,
  request: WriteContractParameters,
  signer: WalletClient
) {
  while (true) {
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
