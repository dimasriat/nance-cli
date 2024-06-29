import { it, expect, describe } from 'bun:test';
import { MockBinanceApiProvider } from './mock/binance-api-provider';

describe('BinanceApiProvider', () => {
  describe('getBinance()', () => {
    it('should return the result if 200 OK', () => {
      const api = new MockBinanceApiProvider();

      type T = { foo: string };
      api.setResultForGetPostBinance<T>({ foo: 'bar' });
      const responsePromise = api.getBinance<T>({ path: '/foo' });

      responsePromise.then((response) => {
        expect(response).toHaveProperty('status');
        expect(response).toHaveProperty('code');
        expect(response).toHaveProperty('result');
        expect(response).toHaveProperty('errorMsg');

        expect(response.status).toBe('success');
        expect(response.code).toBe(200);
        expect(response.errorMsg).toBeUndefined();
        expect(response.result).toHaveProperty('foo');

        if (response.result) expect(response.result.foo).toBe('bar');
      });
    });

    it('should return the error code & message if not 200 OK', () => {
      const api = new MockBinanceApiProvider();

      const status = { code: 400, errorMsg: 'your mom' };
      api.setResultForGetPostBinance<{}>({ foo: 'bar' });
      api.setCodeForGetPostBinance(status.code);
      api.setErrorMsgForGetPostBinance(status.errorMsg);
      const responsePromise = api.getBinance<{}>({ path: '/foo' });

      responsePromise.then((response) => {
        expect(response).toHaveProperty('status');
        expect(response).toHaveProperty('code');
        expect(response).toHaveProperty('errorMsg');
        expect(response).toHaveProperty('result');

        expect(response.status).toBe('error');
        expect(response.code).toBe(status.code);
        expect(response.result).toBeUndefined();
        if (response.errorMsg) expect(response.errorMsg).toBe(status.errorMsg);
      });
    });
  });
  describe('postSignedBinance()', () => {
    it('should return the result if ( 200? ) OK', () => {});
    it('should return the error code & message if not 200 OK', () => {});
  });
});
