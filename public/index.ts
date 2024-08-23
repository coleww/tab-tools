import { getTabChords, getPossibleKeys, parseTab, createTab } from '../dist';
import format from 'json-nice';

document.body.addEventListener('paste', function (e) {
  const output = document.getElementById('main');
  if (!output) {
    console.log('wha');
    return;
  }
  try {
    const data = e.clipboardData?.getData('text/plain')?.split('\n') || [];
    const tabData = parseTab(data);
    const fmtTab = tabData.map(data => createTab(data).join('\n'));
    const key = `Possible keys: ${getPossibleKeys(tabData)}`;
    const fmtChords = tabData.map(data =>
      getTabChords(data).map(chord => chord[0].root)
    );
    const fmtJson = format(tabData, { indent: ' ' }); //.split('\n   ').join(' ') || '';

    const result = [...fmtTab, fmtChords, key, fmtJson].join('\n');

    output.textContent = result;
  } catch (e) {
    output.textContent = e;
  }
});
