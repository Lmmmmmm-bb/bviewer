import { FC, useState } from 'react';
import type { IBVideoInfoQuery } from '~types';
import { B_API_VIDEO_INFO, matchBvidReg } from './config';
import './index.css';
import { concatUrlQuery } from './utils';

const Popup: FC = () => {
  const [previewSrc, setPreviewSrc] = useState('');

  const fetchVideoInfo = async (bvid: string) => {
    const url = concatUrlQuery<IBVideoInfoQuery>(B_API_VIDEO_INFO, { bvid });
    const response = await fetch(url);
    const { data } = await response.json();

    setPreviewSrc(data.pic);
  };

  const handleClick = async () => {
    const [current] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    const match = current.url.match(matchBvidReg);
    if (match.groups) {
      const { bvid } = match.groups;
      !previewSrc && fetchVideoInfo(bvid);
    }
  };

  return (
    <div className='wrapper'>
      {previewSrc && (
        <a
          style={{ marginBottom: 16 }}
          target='_blank'
          title='download preview'
          href={previewSrc}
        >
          <img className='preview' src={previewSrc} alt='video preview' />
        </a>
      )}
      <button className='up-btn' onClick={handleClick}>
        获取当前视频封面
      </button>
    </div>
  );
};

export default Popup;
