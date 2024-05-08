export function getTime() {
  const date = new Date(Date.now());
  const formatStakeTime = date.toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
  });

  return formatStakeTime;
}

export async function randomDelay(delay_: number = 0) {
  const MINUTES = 60; // 60 seconds
  const LIMIT = Number(delay_) * MINUTES; // 最多不超過延遲 $DELAY 分鐘

  const rand = Math.floor(Math.random() * LIMIT);
  console.log(`Start time: ${getTime()} | Delay ${rand} seconds`);

  await delay(rand * 1000);
}
export async function delay(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
