import {
  Address,
  WalletClient,
  createPublicClient,
  createWalletClient,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, sepolia } from "viem/chains";

const ACCOUNT = privateKeyToAccount(process.env.PK as Address);

const CONFIG = {
  chain: process.env.MODE === "dev" ? sepolia : base,
  transport: http(process.env.RPC as string),
};

export const PUBLIC_CLIENT = createPublicClient(CONFIG);
export const SIGNER = createWalletClient({
  account: ACCOUNT,
  ...CONFIG,
});

export const SIGNER_ADDR = SIGNER.account.address;

export async function sendTransaction(request: any, signer: WalletClient) {
  const hash = await signer.writeContract(request);
  const transaction = await PUBLIC_CLIENT.waitForTransactionReceipt({
    hash,
  });
  console.log(
    `Tx Hash: ${transaction.transactionHash} - ${transaction.status}`
  );
}
