import { base, sepolia } from "viem/chains";
import { http } from "viem";

import * as dotenv from "dotenv";
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
});

export const CONFIG = {
  chain: process.env.MODE === "dev" ? sepolia : base,
  transport: http(process.env.RPC as string),
};
