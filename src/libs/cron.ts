import { getTime, randomDelay } from "./time";

export function createCronConfig(
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

export function parseCronJob(cronJob: string[] | undefined) {
  if (cronJob === undefined) return "* */10 * * * *";

  const parseResult = cronJob.map((job) => {
    if (job.includes('"')) {
      return job.replace('"', "");
    }
    return job;
  });

  return parseResult.join(" ");
}
