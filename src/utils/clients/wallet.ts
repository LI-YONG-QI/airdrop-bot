import { Address, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { CONFIG } from "@/utils/clients/config";

import * as dotenv from "dotenv";
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
});

const ACCOUNT = privateKeyToAccount(process.env.PK as Address);

export const SIGNER = createWalletClient({
  account: ACCOUNT,
  ...CONFIG,
});
