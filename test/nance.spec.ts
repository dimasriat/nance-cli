import { it, expect, describe } from 'bun:test';
import { Nance } from '../src/nance';
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
        expect(actual).rejects.toThrow('API error');
      });
    });

    describe('showAllPositions()', () => {
      it.skip('should show all positions', async () => {});
      it.skip("should throw an error if the connection isn't OK", async () => {});
    });
  });

  describe('WRITE METHOD', () => {
    describe('openLong()', () => {});
  });
});
