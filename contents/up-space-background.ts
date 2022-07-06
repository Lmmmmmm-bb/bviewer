import type { PlasmoContentScript } from 'plasmo';
import { matchUidReg } from '~components/bilibili/config';
import { fetchUpInfo } from '~utils';

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

      const { top_photo: topPhoto } = await fetchUpInfo(uid);
      topPhoto && window.open(topPhoto);
    });
  }
});
