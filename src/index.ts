import { NanceCli } from './cli';
import { NanceConfig } from './config';
import { Nance } from './nance';
import { BinanceApiProvider } from './providers/binance-api';

const config = NanceConfig.getInstance();
const api = new BinanceApiProvider(config);
const nance = new Nance(api);
const cli = new NanceCli(nance);

cli.createProgram().parse(process.argv);
