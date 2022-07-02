import { FC, useState } from 'react';
import PreviewButton from '~components/preview-button';
import UpCoverButton from '~components/up-cover-button';
import { useFetchType } from '~hooks';
import { FetchType, matchBvidReg, matchUidReg } from './config';
import { fetchBUpInfo, fetchBVideoInfo } from './fetch';
import { queryCurrentTab } from './utils';
import './index.css';

const BiliBili: FC = () => {
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
    <>
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
    </>
  );
};

export default BiliBili;
