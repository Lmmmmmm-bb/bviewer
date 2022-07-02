import { FC, useState } from 'react';
import PreviewButton from '~components/preview-button';
import UpCoverButton from '~components/up-cover-button';
import { useFetchType } from '~hooks';
import type { FetchType } from '~types';
import { queryCurrentTab } from '~utils';
import { matchBvidReg, matchUidReg } from './config';
import { fetchBUpBackgroundInfo, fetchBVideoInfo } from './fetch';
import styles from './index.module.scss';

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
      fetchSrc = await fetchBUpBackgroundInfo(match.groups.uid);
    }

    setImageSrc(fetchSrc);
  };

  return (
    <div className={styles.wrapper}>
      {imageSrc && (
        <a
          target='_blank'
          title='查看原图'
          href={imageSrc}
          rel='noopener noreferrer'
        >
          <img className={styles.preview} src={imageSrc} alt='封面背景图片' />
        </a>
      )}
      <div className={styles.btnWrapper}>
        {fetchType === 'cover' && (
          <UpCoverButton onClick={() => handleFetch('cover')} />
        )}
        {fetchType === 'preview' && (
          <PreviewButton onClick={() => handleFetch('preview')} />
        )}
      </div>
    </div>
  );
};

export default BiliBili;
