import { createPublicClient } from "viem";
import { CONFIG } from "./config";

export const PUBLIC_CLIENT = createPublicClient(CONFIG);
