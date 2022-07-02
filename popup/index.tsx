import { FC, useState } from 'react';
import { FetchType, matchBvidReg, matchUidReg } from './config';
import { queryCurrentTab } from './utils';
import './index.css';
import UpCoverButton from '~components/up-cover-button';
import PreviewButton from '~components/preview-button';
import { fetchBUpInfo, fetchBVideoInfo } from './fetch';
import { useFetchType } from '~hooks';

const Popup: FC = () => {
  const fetchType = useFetchType();
  const [imageSrc, setImageSrc] = useState('');

  const handleFetch = async (type: FetchType) => {
    if (imageSrc) return;

    let fetchSrc = '';
    const current = await queryCurrentTab();

    if (type === 'preview') {
      const match = current.url.match(matchBvidReg);
      fetchSrc = await fetchBVideoInfo(match.groups.bvid);
    } else if (type === 'cover') {
      const match = current.url.match(matchUidReg);
      fetchSrc = await fetchBUpInfo(match.groups.uid);
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
        {fetchType === 'cover' ? (
          <UpCoverButton onClick={() => handleFetch('cover')} />
        ) : fetchType === 'preview' ? (
          <PreviewButton onClick={() => handleFetch('preview')} />
        ) : (
          <button className='basic-btn'>插件不可用</button>
        )}
      </div>
    </div>
  );
};

export default Popup;
