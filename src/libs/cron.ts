import { getTime, randomDelay } from "@/libs/time";

export function createConfig(
  interaction: () => Promise<void>,
  cronTime: string,
  delay: number
) {
  return {
    cronTime: cronTime,
    onTick: async function () {
      console.log("Start new round");

      await randomDelay(delay);
      await interaction();

      console.log(`End time ${getTime()}`);
      console.log("=============================");
    },
    start: true,
    timeZone: "Asia/Taipei",
  };
}
