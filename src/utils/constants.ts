import * as dotenv from "dotenv";
import { Address } from "viem";
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
});

export const UNISWAP_ROUTER_ADDR = process.env.UNISWAP_ROUTER as Address;

export const UNI_V3_POOL_ADDR = process.env.UNI_V3_POOL as Address;
