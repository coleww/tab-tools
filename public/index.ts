import { getPossibleKeys, getTabChords, parseTab, createTab } from '../dist';
import format from 'json-nice';


document.body.addEventListener('paste', function (e) {
  const output = document.getElementById("main");
  if (!output) {
    console.log('wha')
    return;
  };
  try {
    const data = e.clipboardData?.getData('text/plain')?.split('\n') || [];
    const tabData = parseTab(data);
    const fmtTab = createTab(tabData);
    const key = `Possibly keys: ${getPossibleKeys(tabData)}`
    const fmtJson = format(tabData, {indent: ' '}).split('\n   ').join(' ') || '';

    const result = [...fmtTab, key, fmtJson].join('\n')
    console.log
    output.textContent = result
  } catch (e) {
    output.textContent = e;
  }
});
