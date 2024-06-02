import type { Hex } from "viem";
import { beforeAll } from "vitest";
import { testClient } from "./helpers";

export let state: Hex;

beforeAll(async () => {
  state = await testClient.dumpState();
});
