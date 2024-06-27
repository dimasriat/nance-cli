import { Command } from 'commander';
import type { INance } from './nance';

export class NanceCli {
  constructor(private nance: INance) {}

  public createProgram(): Command {
    const program = new Command();

    program
      .name('nance-cli')
      .description('CLI for Binance Futures')
      .version('0.0.1');

    program
      .command('check-server-time')
      .description('Check the current server time')
      .action(async () => {
        const serverTime = await this.nance.checkServerTime();
        console.log(serverTime);
      });

    return program;
  }
}
