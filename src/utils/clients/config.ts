import { base, sepolia } from "viem/chains";
import { http } from "viem";

export const CONFIG = {
  chain: process.env.MODE === "dev" ? sepolia : base,
  transport: http(process.env.RPC as string),
};
