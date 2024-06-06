import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { parseEther } from "viem";

import { state } from "./__setup";
import { aave } from "../src/protocols/aave/scripts";
import { createContract, mockProtocol, TEST_USER, testClient } from "./helpers";
import type { ProtocolContracts } from "../src/types/protocol";

let contracts: ProtocolContracts;

describe("aave scripts", () => {
  beforeEach(async () => {
    await testClient.revert({ id: state });
    await testClient.snapshot();
    contracts = createContract(mockProtocol.publicClient, mockProtocol.signer);
  });

  afterAll(async () => {
    await testClient.revert({ id: state });
    await testClient.snapshot();
  });

  it("Get balance", async () => {
    console.log(
      await mockProtocol.publicClient.getBalance({
        address: TEST_USER,
      })
    );
  });

  //TODO: expect logs data
  it("Aave execution", async () => {
    const beforeUserBalance = await testClient.getBalance({
      address: TEST_USER,
    });

    const txs = await aave(contracts, parseEther("0.0001"));
    const afterUserBalance = await testClient.getBalance({
      address: TEST_USER,
    });

    expect(beforeUserBalance).toBeGreaterThan(afterUserBalance);
    expect(txs.length).toBe(3);
  });
});
