import { CronJob } from "cron";
import * as dotenv from "dotenv";

import { randomDelay } from "@/libs/time";
import { getTime } from "@/libs/time";
import { SIGNER } from "@/utils/clients/wallet";
import { uniswap } from "@/utils/uniswap";

dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
});

const config = {
  cronTime: process.env.CRONJOB || "* * * * * *", // At 10:00.
  onTick: async function () {
    console.log("Start new round");
    await randomDelay();
    await uniswap();
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
