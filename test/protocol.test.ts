import { afterAll, beforeEach, describe, it } from "vitest";
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

  it("Aave execution", async () => {
    await aave(contracts, parseEther("0.0001"));
  });
});
