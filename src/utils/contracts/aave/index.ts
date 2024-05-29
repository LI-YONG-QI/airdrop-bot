import { Transport, Chain, getContract, PublicClient, Address } from "viem";
import { AAVE_ABI, WETH_ABI } from "../abis";
import { AAVEContract } from "../../../classes/aave";

const getAaveAddress = (chain: string): Address => {
  switch (chain) {
    case "Base":
      return "0x8be473dCfA93132658821E67CbEB684ec8Ea2E74";
    case "Sepolia":
      return "0x387d311e47e80b498169e6fb51d3193167d89F7D";
  }

  throw new Error("Invalid chain");
};

const getWethAddress = (chain: string): Address => {
  switch (chain) {
    case "Base":
      return "0xD4a0e0b9149BCee3C920d2E00b5dE09138fd8bb7";
    case "Sepolia":
      return "0x5b071b590a59395fE4025A0Ccc1FcC931AAc1830";
  }

  throw new Error("Invalid chain");
};

const getAddresses = (chain: string) => {
  return {
    aave: getAaveAddress(chain),
    weth: getWethAddress(chain),
  };
};

export const createAAVEContracts = (
  publicClient: PublicClient<Transport, Chain>
): AAVEContract => {
  const addresses = getAddresses(publicClient.chain.name);

  return {
    public: publicClient,
    aave: getContract({
      address: addresses.aave,
      abi: AAVE_ABI,
      client: { public: publicClient },
    }),
    weth: getContract({
      address: addresses.weth,
      abi: WETH_ABI,
      client: { public: publicClient },
    }),
  };
};
