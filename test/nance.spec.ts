import { it, expect, describe } from 'bun:test';
import { AccountState, Nance } from '../src/nance';
import { MockBinanceApiProvider } from './mock/binance-api-provider';

describe('Nance', () => {
  describe('READ METHOD', () => {
    describe('checkServerTime()', () => {
      it('should show the current serverTime if the connection is OK', async () => {
        // arange
        const api = new MockBinanceApiProvider();
        const sut = new Nance(api);

        const expected = 69420;

        // act
        const actual = sut.checkServerTime();

        // assert
        expect(actual).resolves.toBe(expected);
      });

      it("should throw an error if the connection isn't OK", async () => {
        // arange
        const api = new MockBinanceApiProvider();
        const sut = new Nance(api);

        api.setConnectionOk(false);

        // act
        const actual = sut.checkServerTime();

        // assert
        expect(actual).rejects.toThrow('ERROR: CHECK_SERVER_TIME');
      });
    });

    describe('getAccountState()', () => {
      it('should return account state', async () => {
        // arange
        const api = new MockBinanceApiProvider();
        const sut = new Nance(api);
        const expected: AccountState = {
          marginAsset: 'USDT',
          marginBalance: '1000',
          availableBalance: '1000',
          unrealizedProfit: '0',
          positions: [
            {
              symbol: 'BTCUSDT',
              entryPrice: '1000',
              markPrice: '1000',
              unrealizedProfit: '0',
              positionAmt: '1000',
              positionSide: 'LONG',
              leverage: '1',
            },
          ],
        };

        // act
        const actual = sut.getAccountState();

        // assert
        expect(actual).resolves.toBe(expected);
      });

      it("should throw an error if the connection isn't OK", async () => {
        // arange
        const api = new MockBinanceApiProvider();
        const sut = new Nance(api);

        api.setConnectionOk(false);

        // act
        const actual = sut.getAccountState();

        // assert
        expect(actual).rejects.toThrow('ERROR: GET_ACCOUNT_STATE');
      });
    });

    describe('calculateEntry()', () => {});
  });

  describe('WRITE METHOD', () => {
    describe('openLong()', () => {});
    describe('openShort()', () => {});
    describe('closePosition()', () => {});
    describe('placeTP()', () => {});
    describe('removeTP()', () => {});
    describe('placeSL()', () => {});
    describe('removeSL()', () => {});
  });
});
