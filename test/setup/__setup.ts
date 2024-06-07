import { beforeAll } from "vitest";
import { TEST_USER, testClient } from "./helpers";
import { parseEther, type Hex } from "viem";

export let state: Hex;

beforeAll(async () => {
  await testClient.setBalance({
    address: TEST_USER,
    value: parseEther("100"),
  });
  state = await testClient.snapshot();
});
