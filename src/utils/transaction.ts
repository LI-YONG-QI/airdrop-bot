import type { WriteContractParameters } from "viem";
import { ProtocolPublicClient, ProtocolWalletClient } from "../types/protocol";

export async function sendTransaction(
  client: { public: ProtocolPublicClient; signer: ProtocolWalletClient },
  request: WriteContractParameters
) {
  while (true) {
    console.log("Sending transaction...");
    console.log(client.signer.chain);
    console.log(request);
    const hash = await client.signer.writeContract(request);
    const transaction = await client.public.waitForTransactionReceipt({
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
