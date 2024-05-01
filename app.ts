import { CronJob } from "cron";
import { aave } from "./src/aave";
import { SIGNER } from "./src/utils/clients/wallet";

import * as dotenv from "dotenv";
import { getTime, randomDelay } from "./src/utils/time";
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
});

const config = {
  cronTime: process.env.CRONJOB || "* * * * * *", // At 10:00.
  onTick: async function () {
    console.log("Start new round");
    await randomDelay();
    await aave();
    console.log(`End time ${getTime()}`);
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
  console.log(
    `Time ${process.env.CRONJOB} | Delay ${process.env.DELAY} minutes`
  );
  console.log(`Account ${SIGNER.account.address}`);
  app.start();
}

main();
