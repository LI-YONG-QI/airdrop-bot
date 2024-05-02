import { zeroAddress } from "viem";
import { SIGNER } from "./src/utils/clients/wallet";
import { AAVE } from "./src/utils/contracts/aave";
import { PUBLIC_CLIENT } from "./src/utils/clients/public";

const SIGNER_ADDR = SIGNER.account.address;

async function test() {
  const nonce = await PUBLIC_CLIENT.getTransactionCount({
    address: SIGNER_ADDR,
  });

  const { request } = await AAVE.simulate.depositETH(
    [zeroAddress, SIGNER_ADDR, 0],
    {
      value: BigInt(100),
      account: SIGNER.account,
      nonce,
    }
  );
  console.log(request);
}

test();
