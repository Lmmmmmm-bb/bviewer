import type { PlasmoContentScript } from 'plasmo';
import { B_API_VIDEO_INFO, matchBvidReg } from '~components/bilibili/config';
import { concatUrlQuery, fetchGet } from '~utils';

export const config: PlasmoContentScript = {
  matches: ['https://www.bilibili.com/video/*']
};

// 视频页中自动加载视频会重新加载
// 重新加载后 window load 失去绑定
setTimeout(() => {
  const toolbar = document.querySelector('.toolbar-right');
  const tag = document.querySelector('.manuscript-report');

  if (tag) {
    const fetchPreviewEl = document.createElement('div');
    fetchPreviewEl.title = '获取视频封面';
    fetchPreviewEl.style.cssText = 'margin-right: 18px;';
    fetchPreviewEl.innerText = '获取视频封面';
    toolbar.prepend(fetchPreviewEl);

    fetchPreviewEl.addEventListener('click', () => {
      const bvid = window.location.href.match(matchBvidReg).groups.bvid;
      const url = concatUrlQuery(B_API_VIDEO_INFO, { bvid });
      fetchGet(url)
        .then(({ data }) => {
          const { pic } = data;
          pic && window.open(pic);
        })
        .catch((err) => {
          console.error(`[BViewer] ${err.message}`);
        });
    });
  }
}, 3000);
