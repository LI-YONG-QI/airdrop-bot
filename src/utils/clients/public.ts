import { createPublicClient } from "viem";
import { CONFIG } from "@/utils/clients/config";

export const PUBLIC_CLIENT = createPublicClient(CONFIG);
