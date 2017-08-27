import {
  prepareHeaders,
  camelizeResponseArray,
  formatNumber,
  formatLabel,
  calculateAutarchy,
} from '../_util';

describe('_util functions tests', () => {
  test('prepareHeaders returns headers with token', () => {
    const token = 'token';
    expect(prepareHeaders(token)).toEqual({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  });

  test('camelizer functions returns camelized object keys', () => {
    const inArray = [
      'snake_case',
      ['snake_case'],
      { camel_case: 'snake_case', array: ['snake_case', { camel_case: 'snake_case' }] },
    ];
    const outArray = [
      'snake_case',
      ['snake_case'],
      { camelCase: 'snake_case', array: ['snake_case', { camelCase: 'snake_case' }] },
    ];
    expect(camelizeResponseArray(inArray)).toEqual(outArray);
  });

  test('formatNumber returns formatted string', () => {
    expect(formatNumber(1000000000000000)).toBe('1');
  });

  test('formatLabel returns formatted string', () => {
    expect(formatLabel(1000000000000000)).toBe('1 PW');
    expect(formatLabel(1000000000000)).toBe('1 TW');
    expect(formatLabel(1000000000)).toBe('1 GW');
    expect(formatLabel(1000000)).toBe('1 MW');
    expect(formatLabel(1000)).toBe('1 kW');
    expect(formatLabel(1)).toBe('1 W');
  });

  test('calculateAutarchy returns autarchy value', () => {
    expect(calculateAutarchy({ in: [{ timestamp: 1, value: 100 }], out: [{ timestamp: 1, value: 50 }] })).toBe('0.50');
  });
});
