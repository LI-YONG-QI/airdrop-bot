import { Address, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { CONFIG } from "./config";

const ACCOUNT = privateKeyToAccount(process.env.PK as Address);

export const SIGNER = createWalletClient({
  account: ACCOUNT,
  ...CONFIG,
});
