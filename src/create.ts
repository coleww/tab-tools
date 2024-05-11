import { validateTabData } from '.';
import type { TabData } from './constants';

export function createTab(tabData: TabData): string[] {
  if (!validateTabData(tabData)) {
    return [];
  }
  const { tuning, data } = tabData;
  return (data[0] || []).reduce((res, _, beatIdx) => {
    const columnHasDouble = data.some(stringData => {
      const colContent = stringData[beatIdx];
      return colContent?.length && colContent?.length > 1;
    });
    return res.map((stringRes, stringIdx) => {
      const stringData = data[stringIdx];
      const beatData = stringData?.at(beatIdx);
      return (stringRes +=
        '-' + handleDouble(beatData || '-', columnHasDouble));
    });
  }, generateTuningStrings(tuning));
}

export function generateTuningStrings(tuning: string[]): string[] {
  const hasDouble = tuning.some(note => note.length > 1);
  return tuning.map(note => `${handleDouble(note, hasDouble)}|`);
}

function handleDouble(data: string, hasDouble: boolean): string {
  return hasDouble ? `${data}-`.slice(0, 2) : data;
}
