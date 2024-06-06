import {
  createTestClient,
  http,
  parseEther,
  getContract,
  createPublicClient,
  createWalletClient,
} from "viem";
import type { Chain, Hex } from "viem";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

import {
  ProtocolImpl,
  type Execution,
  type ProtocolContracts,
  type ProtocolPublicClient,
  type ProtocolWalletClient,
} from "../src/types/protocol";
import { aave, getAddresses } from "../src/protocols/aave";
import { AAVE_ABI, WETH_ABI } from "../src/utils/abis";

const MOCK_USER_PK: Hex =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // First anvil account

const testConfig = {
  transport: http("http://127.0.0.1:8545"),
  chain: base as Chain,
};

export const testClient = createTestClient({
  ...testConfig,
  mode: "anvil",
  cacheTime: 0, //no cache
});

export const TEST_USER = privateKeyToAccount(MOCK_USER_PK).address;

export const publicClient = createPublicClient({
  ...testConfig,
});

export const signer = createWalletClient({
  ...testConfig,
  account: privateKeyToAccount(MOCK_USER_PK),
});

export const createContract = (
  publicClient: ProtocolPublicClient,
  signer: ProtocolWalletClient
): ProtocolContracts => {
  const addresses = getAddresses("Base");

  return {
    client: { public: publicClient, signer },

    aave: getContract({
      address: addresses.aave,
      abi: AAVE_ABI,
      client: { public: publicClient, wallet: signer },
    }),

    weth: getContract({
      address: addresses.weth,
      abi: WETH_ABI,
      client: { public: publicClient, wallet: signer },
    }),
  };
};

const createMockProtocol = (execution: Execution, pk: Hex, amount: bigint) => {
  return new ProtocolImpl(
    publicClient,
    signer,
    createContract,
    execution,
    amount
  );
};

export const mockProtocol = createMockProtocol(
  aave,
  MOCK_USER_PK,
  parseEther("0.0001")
);
