import type { WriteContractParameters } from "viem";
import { ProtocolPublicClient, ProtocolWalletClient } from "../types/protocol";

export async function sendTransaction(
  client: { public: ProtocolPublicClient; signer: ProtocolWalletClient },
  request: WriteContractParameters
) {
  while (true) {
    const hash = await client.signer.writeContract(request);
    const transaction = await client.public.waitForTransactionReceipt({
      confirmations: 1,
      hash,
      pollingInterval: 4_000,
    });

    console.log(
      `Tx Hash: ${transaction.transactionHash} - ${transaction.status}`
    );

    if (transaction.status === "success") break;

    console.log("Reverted !! Retrying...");
  }
}
