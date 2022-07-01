import { FC, useState } from 'react';
import type { IBUpInfoQuery, IBVideoInfoQuery } from '~types';
import {
  B_API_UP_INFO,
  B_API_VIDEO_INFO,
  FetchType,
  matchBvidReg,
  matchUidReg
} from './config';
import { biliParser, queryCurrentTab } from './utils';
import './index.css';

const Popup: FC = () => {
  const [imageSrc, setImageSrc] = useState('');

  const handleFetch = async (type: FetchType) => {
    if (imageSrc) return;

    let fetchSrc = '';
    const current = await queryCurrentTab();

    if (type === 'preview') {
      const match = current.url.match(matchBvidReg);
      if (match && match.groups) {
        const { bvid } = match.groups;
        fetchSrc = await biliParser<IBVideoInfoQuery>(
          B_API_VIDEO_INFO,
          { bvid },
          'pic'
        );
      }
    } else if (type === 'cover') {
      const match = current.url.match(matchUidReg);
      if (match && match.groups) {
        const { uid } = match.groups;
        fetchSrc = await biliParser<IBUpInfoQuery>(
          B_API_UP_INFO,
          { mid: uid },
          'top_photo'
        );
      }
    }

    setImageSrc(fetchSrc);
  };

  return (
    <div className='wrapper'>
      {imageSrc && (
        <a
          target='_blank'
          title='查看原图'
          href={imageSrc}
          rel='noopener noreferrer'
        >
          <img className='preview' src={imageSrc} alt='封面背景图片' />
        </a>
      )}
      <div className='btn-wrapper'>
        <button
          className='basic-btn up-btn'
          onClick={() => handleFetch('cover')}
        >
          获取当前 UP 背景
        </button>
        <button
          className='basic-btn preview-btn'
          onClick={() => handleFetch('preview')}
        >
          获取当前视频封面
        </button>
      </div>
    </div>
  );
};

export default Popup;
