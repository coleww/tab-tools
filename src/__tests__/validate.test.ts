import { validateTabData } from '../validate';
import { mockTabData } from './fixtures';

describe('validateTabData', () => {
  it('returns true for valid data', () => {
    expect(validateTabData(mockTabData)).toBe(true);
  });

  it('returns true for single string input', () => {
    expect(
      validateTabData({
        tuning: ['e'],
        data: [['1', '3', '5']],
      })
    ).toBe(true);
  });

  it('detects tuning mismatch', () => {
    expect(
      validateTabData({
        ...mockTabData,
        tuning: ['b', 'f', 'd'],
      })
    ).toBe(false);
  });

  it('detects string length mismatch', () => {
    expect(
      validateTabData({
        ...mockTabData,
        data: [...mockTabData.data.slice(1), ['', '', '', '', '']],
      })
    ).toBe(false);
  });
});
