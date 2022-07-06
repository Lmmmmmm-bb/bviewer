import type { PlasmoContentScript } from 'plasmo';
import { B_API_UP_INFO, matchUidReg } from '~components/bilibili/config';
import type { IBUpInfoQuery } from '~types';
import { biliParser } from '~utils';

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

    fetchBackgroundEl.addEventListener('click', async () => {
      const uid = window.location.href.match(matchUidReg).groups.uid;

      const topPhoto = await biliParser<IBUpInfoQuery, string>(
        B_API_UP_INFO,
        { mid: uid },
        'top_photo'
      );
      topPhoto && window.open(topPhoto);
    });
  }
});
