import type { PlasmoContentScript } from 'plasmo';
import { B_API_UP_INFO, matchUidReg } from '~components/bilibili/config';
import { concatUrlQuery, fetchGet } from '~utils';

export const config: PlasmoContentScript = {
  matches: ['https://space.bilibili.com/*']
};

window.addEventListener('load', () => {
  const dropdown = document.querySelector(
    '.h-add-to-black > .be-dropdown-menu'
  );

  if (dropdown) {
    const fetchBackgroundEl = document.createElement('li');
    fetchBackgroundEl.title = '获取背景图片';
    fetchBackgroundEl.className = 'be-dropdown-item';
    fetchBackgroundEl.innerText = '获取背景图片';
    dropdown.prepend(fetchBackgroundEl);

    fetchBackgroundEl.addEventListener('click', () => {
      const uid = window.location.href.match(matchUidReg).groups.uid;
      const url = concatUrlQuery(B_API_UP_INFO, { mid: uid });
      fetchGet(url)
        .then(({ data }) => {
          const { top_photo } = data;
          top_photo && window.open(top_photo);
        })
        .catch((err) => {
          console.error(`[BViewer] ${err.message}`);
        });
    });
  }
});
