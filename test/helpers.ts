import {
  createTestClient,
  http,
  parseEther,
  createPublicClient,
  createWalletClient,
  publicActions,
  walletActions,
} from "viem";
import type { Chain, Hex } from "viem";
import { base } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

import {
  ProtocolImpl,
  type Execution,
  type ProtocolContracts,
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
})
  .extend(publicActions)
  .extend(walletActions);

export const TEST_USER = privateKeyToAccount(MOCK_USER_PK).address;

export const publicClient = createPublicClient({
  ...testConfig,
});

export const signer = createWalletClient({
  ...testConfig,
  account: privateKeyToAccount(MOCK_USER_PK),
});

export const createClients = () => {
  return {
    public: publicClient,
    signer,
  };
};

export const createContract = (): ProtocolContracts => {
  const addresses = getAddresses("Base");

  return {
    aave: {
      address: addresses.aave,
      abi: AAVE_ABI,
    },

    weth: {
      address: addresses.weth,
      abi: WETH_ABI,
    },
  };
};

const createMockProtocol = (execution: Execution, pk: Hex, amount: bigint) => {
  return new ProtocolImpl(
    { signer, public: publicClient },
    createContract(),
    execution,
    amount
  );
};

export const mockProtocol = createMockProtocol(
  aave,
  MOCK_USER_PK,
  parseEther("0.0001")
);
