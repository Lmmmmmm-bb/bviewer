import { FC, useState } from 'react';
import { FetchType, matchBvidReg, matchUidReg } from './config';
import { queryCurrentTab } from './utils';
import './index.css';
import UpCoverButton from '~components/up-cover-button';
import PreviewButton from '~components/preview-button';
import { fetchBUpInfo, fetchBVideoInfo } from './fetch';

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
        fetchSrc = await fetchBVideoInfo(bvid);
      }
    } else if (type === 'cover') {
      const match = current.url.match(matchUidReg);
      if (match && match.groups) {
        const { uid } = match.groups;
        fetchSrc = await fetchBUpInfo(uid);
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
        <UpCoverButton onClick={() => handleFetch('cover')} />
        <PreviewButton onClick={() => handleFetch('preview')} />
      </div>
    </div>
  );
};

export default Popup;
