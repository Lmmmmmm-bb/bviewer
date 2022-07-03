import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '~components/video-card';
import type { IBSpaceQuery, ISpaceVideo } from '~types';
import { fetchBSpaceVideo } from './fetch';
import styles from './index.module.scss';
import NoData from '~assets/nodata.png';

const UpSpace: FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const [videoList, setVideoList] = useState<ISpaceVideo[]>([]);

  const fetchVideoList = async (query: Omit<IBSpaceQuery, 'mid'>) => {
    const { vlist } = await fetchBSpaceVideo({ mid: uid, ...query });
    setVideoList(vlist);
  };

  useEffect(() => {
    fetchVideoList({ pn: 1 });
  }, []);

  return (
    <div className={styles.wrapper}>
      {videoList.length === 0 ? (
        <div className={styles.noData} />
      ) : (
        <div className={styles.videoWrapper}>
          {videoList.map((video) => (
            <VideoCard video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpSpace;
