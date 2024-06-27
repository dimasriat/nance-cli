import { NanceCli } from './cli';
import { Nance } from './nance';
import { BinanceApiProvider } from './providers/binance-api';

const api = new BinanceApiProvider();
const nance = new Nance(api);
const cli = new NanceCli(nance);

cli.createProgram().parse(process.argv);
