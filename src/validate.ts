import { TabData } from './constants';

export function validateTabData(tabData: TabData) {
  return (
    tabData.tuning.length &&
    tabData.data.length &&
    tabData.tuning.length === tabData.data.length &&
    allArraysAreSameLength(tabData.data)
  );
}

function allArraysAreSameLength(arrays: string[][]) {
  if (arrays.length === 1) return true;

  const firstArrayLength = arrays[0]?.length;
  const hasNonMatchingArrayLength = arrays
    .slice(1)
    .some(a => a.length !== firstArrayLength);
  return !hasNonMatchingArrayLength;
}
