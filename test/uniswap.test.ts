import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { parseEther } from "viem";

import { state } from "./__setup";
import { mockProtocolUniswap, TEST_USER, testClient } from "./helpers";
import { uniswap } from "../src/protocols/uniswap";

describe("uniswap scripts", () => {
  beforeEach(async () => {
    await testClient.revert({ id: state });
    await testClient.snapshot();
  });

  afterAll(async () => {
    await testClient.revert({ id: state });
    await testClient.snapshot();
  });

  it("Get balance", async () => {
    console.log(
      await mockProtocolUniswap.clients.public.getBalance({
        address: TEST_USER,
      })
    );
  });

  //TODO: expect logs data
  it("Uniswap execution", async () => {
    const beforeUserBalance = await testClient.getBalance({
      address: TEST_USER,
    });

    const txs = await uniswap(
      mockProtocolUniswap.clients,
      mockProtocolUniswap.contracts,
      parseEther("0.0001")
    );

    const afterUserBalance = await testClient.getBalance({
      address: TEST_USER,
    });

    expect(beforeUserBalance).toBeGreaterThan(afterUserBalance);
    expect(txs.length).toBe(1);
  });
});
