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

    program
      .command('get-asset-price <symbol>')
      .description('Get the current price of an asset')
      .action(async (symbol: string) => {
        const price = await this.nance.getCurrentAssetPrice(symbol);
        console.log(price);
      });

    program.command('get-account-state').action(async () => {
      const accountState = await this.nance.getAccountState();
      console.log(accountState);
    });

    return program;
  }
}
