import { CronJob } from "cron";
import { aave } from "./src/aave";

const config = {
  cronTime: "* 0 * * * *", //Every day at 12:00:00
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
  app.start();
}

main();
