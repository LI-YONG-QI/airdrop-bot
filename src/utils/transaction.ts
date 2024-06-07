import type { WriteContractParameters } from "viem";
import { ProtocolClients } from "../types/protocol";

export async function sendTransaction(
  clients: ProtocolClients,
  request: WriteContractParameters
) {
  while (true) {
    const hash = await clients.signer.writeContract(request);
    const transaction = await clients.public.waitForTransactionReceipt({
      confirmations: 1,
      hash,
      pollingInterval: 4_000,
    });

    console.log(
      `Tx Hash: ${transaction.transactionHash} - ${transaction.status}`
    );

    if (transaction.status === "success") return transaction.transactionHash;

    console.log("Reverted !! Retrying...");
  }
}
