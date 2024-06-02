import { beforeEach, describe, expect, it } from "vitest";
import { state } from "./__setup";
import { testClient } from "./helpers";

describe("protocol", () => {
  beforeEach(async () => {
    return async () => {
      console.log("reset state");
      await testClient.loadState({ state });
    };
  });

  it("test", async () => {
    console.log(await testClient.getBlockNumber());
    await testClient.mine({ blocks: 1 });
    console.log(await testClient.getBlockNumber());

    expect(true).toBe(true);
  });

  it("test 2", async () => {
    console.log(await testClient.getBlockNumber());
    await testClient.mine({ blocks: 1 });
    console.log(await testClient.getBlockNumber());

    expect(true).toBe(true);
  });
});
