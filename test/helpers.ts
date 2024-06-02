import { createTestClient, http, publicActions } from "viem";

import { foundry } from "viem/chains";

export const testClient = createTestClient({
  chain: foundry,
  mode: "anvil",
  transport: http(),
  pollingInterval: 0, //no cache
}).extend(publicActions);
