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
} from "../../src/types/protocol";
import { aave, getAddresses } from "../../src/protocols/aave";
import {
  uniswap,
  getUniswapContractAddress,
} from "../../src/protocols/uniswap";
import {
  AAVE_ABI,
  UNISWAP_ROUTER_ABI,
  WETH_ABI,
  UNI_V3_POOL_ABI,
} from "../../src/utils/abis";

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

export const getUniswapContract = () => {
  const address = getUniswapContractAddress("Base");

  return {
    router: {
      address: address.router,
      abi: UNISWAP_ROUTER_ABI,
    },

    pool: { address: address.pool, abi: UNI_V3_POOL_ABI },
  };
};

const createMockProtocol = (
  createContract: () => ProtocolContracts,
  execution: Execution,
  amount: bigint
) => {
  return new ProtocolImpl(
    { signer, public: publicClient },
    createContract(),
    execution,
    amount
  );
};

export const mockProtocol = createMockProtocol(
  createContract,
  aave,
  parseEther("0.0001")
);

export const mockProtocolUniswap = createMockProtocol(
  getUniswapContract,
  uniswap,
  parseEther("0.0001")
);
