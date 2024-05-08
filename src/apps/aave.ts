import { Protocol } from "@/types/protocol";
import { aave } from "@/utils/aave";

import * as dotenv from "dotenv";
import { Hex, parseEther } from "viem";
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
});

function main() {
  const pk = process.env.PK as Hex;
  const cronTab = process.env.CRONJOB || "* * * * * *";
  const delay = process.env.DELAY || 0;

  const aaveProtocol = new Protocol(
    aave,
    pk,
    parseEther("0.001"),
    cronTab,
    Number(delay)
  );

  aaveProtocol.execute();
}

main();
