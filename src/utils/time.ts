import * as dotenv from "dotenv";
dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`,
});

export function getTime() {
  const date = new Date(Date.now());
  const formatStakeTime = date.toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
  });

  return formatStakeTime;
}

export async function randomDelay() {
  const MINUTES = 60; // 60 seconds
  const LIMIT = Number(process.env.DELAY) * MINUTES; // 最多不超過延遲 $DELAY 分鐘

  const rand = Math.floor(Math.random() * LIMIT);
  console.log(`Start time: ${getTime()} | Delay ${rand} seconds`);

  await delay(rand * 1000);
}

async function delay(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
