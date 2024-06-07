import { testClient } from "./helpers";
import * as dotenv from "dotenv";
import { publicClient } from "./helpers";

dotenv.config();

async function resetNetwork() {
  await testClient.reset({
    jsonRpcUrl: process.env.RPC,
    blockNumber: BigInt(15305500),
  });

  console.log("Network reset");
  const block = await publicClient.getBlock();
  console.log("Current block number: ", block.number);
}

resetNetwork();
