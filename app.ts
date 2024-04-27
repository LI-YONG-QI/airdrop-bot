import { CronJob } from "cron";
import { aave } from "./src/aave";
import { SIGNER } from "./src/utils/clients/wallet";

import * as dotenv from "dotenv";
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
});

const config = {
  cronTime: process.env.CRONJOB || "* * * * * *", // At 10:00.
  onTick: async function () {
    console.log("Start new round");
    await aave();
    console.log("=============================");
  },
  start: true,
  timeZone: "Asia/Taipei",
};

const app = new CronJob(
  config.cronTime,
  config.onTick,
  null,
  config.start,
  config.timeZone
);

function main() {
  console.log(`Starting app ...`);
  console.log(`Mode ${process.env.MODE}`);
  console.log(`TIME ${process.env.CRONJOB}`);
  console.log(`Account ${SIGNER.account.address}`);
  app.start();
}

main();
