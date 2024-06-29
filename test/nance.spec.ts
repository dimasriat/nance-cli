import { it, expect, describe } from 'bun:test';
import { Nance } from '../src/nance';
import { MockBinanceApiProvider } from './mock/binance-api-provider';
import type { AccountState } from '../src/nance';
import type { AccountInformationResponse } from '../src/providers/binance-api';

describe('Nance', () => {
  describe('GUEST METHOD', () => {
    describe('checkServerTime()', () => {
      it('should show the current serverTime if the connection is OK', () => {
        // arange
        const api = new MockBinanceApiProvider();
        const sut = new Nance(api);

        const expected = 69420;

        // act
        const actual = sut.checkServerTime();

        // assert
        expect(actual).resolves.toBe(expected);
      });

      it("should throw an error if the connection isn't OK", () => {
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
      it('should return account state', () => {
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
        expect(actual).resolves.toEqual(expected);
      });

      it("should throw an error if the connection isn't OK", () => {
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

    describe('getCurrentAssetPrice()', () => {
      it('should show the price of an asset', () => {
        // arange
        const api = new MockBinanceApiProvider();
        const sut = new Nance(api);
        const expected: [string, string, string] = ['69420', '4242', '16.9'];

        api.setTickerPrice('BTC', '69420');
        api.setTickerPrice('ETH', '4242');
        api.setTickerPrice('LINK', '16.9');

        // act
        const actual = Promise.all([
          sut.getCurrentAssetPrice('BTC'),
          sut.getCurrentAssetPrice('ETH'),
          sut.getCurrentAssetPrice('LINK'),
        ]);

        // assert
        expect(actual).resolves.toEqual(expected);
      });
      it.skip("should throw an error if there's no asset mathched params", () => {});
    });
  });

  describe('SIGNED READ METHOD', () => {
    describe('getAccountState()', () => {
      it('should return account state', () => {
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
        expect(actual).resolves.toEqual(expected);
      });
    });
    describe.skip('calculateEntry()', () => {});
    describe.skip('getOpenedPositions()', () => {});
    describe.skip('getClosedPositions()', () => {});
  });

  describe('SIGNED WRITE METHOD', () => {
    describe.skip('openLong()', () => {});
    describe.skip('openShort()', () => {});
    describe.skip('closePosition()', () => {});
    describe.skip('placeTP()', () => {});
    describe.skip('removeTP()', () => {});
    describe.skip('placeSL()', () => {});
    describe.skip('removeSL()', () => {});
  });
});
