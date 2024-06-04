import { CronJob } from "cron";
import type { ProtocolExecution, Protocol } from "./protocol";
import { createCronConfig } from "../models/cron";

export class Bot {
  public cron: CronJob;

  constructor(
    public protocol: Protocol,
    public delay: number = 0,
    cronTime: string
  ) {
    this.initCronJob(protocol.execution, cronTime, delay);
  }

  initCronJob(
    _execution: ProtocolExecution,
    _cronTime: string,
    _delay: number
  ) {
    const config = createCronConfig(_execution, _cronTime, _delay);
    this.cron = new CronJob(
      config.cronTime,
      config.onTick,
      null,
      config.start,
      config.timeZone
    );
  }

  execute() {
    console.log(`Starting app ...`);
    console.log(`Chain ${this.protocol.publicClient.chain?.name}`);
    console.log(`Time ${"Todo time display"} | Delay ${this.delay} minutes`);
    console.log(`Account ${this.protocol.signer.account?.address}`);
    this.cron.start();
  }
}
