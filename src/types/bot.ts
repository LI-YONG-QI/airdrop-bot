import { CronJob } from "cron";
import type { ProtocolExecution, ProtocolParams } from "./protocol";
import { Protocol } from "./protocol";
import { createCronConfig } from "../models/cron";

export class Bot {
  public cron: CronJob;
  public protocol: Protocol;

  constructor(
    protocolParams: ProtocolParams,
    public cronTime: string,
    public delay: number = 0
  ) {
    const _protocol = this.initProtocol(protocolParams);
    this.initCronJob(_protocol.execution, cronTime, delay);
  }

  initProtocol(protocolParams: ProtocolParams) {
    const _protocol = new Protocol(protocolParams);
    this.protocol = _protocol;
    return _protocol;
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
    console.log(`Time ${this.cronTime} | Delay ${this.delay} minutes`);
    console.log(`Account ${this.protocol.signer.account?.address}`);
    this.cron.start();
  }
}
