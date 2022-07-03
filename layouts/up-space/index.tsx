import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import UpSpaceNavigate from '~components/up-space-navigate';
import VideoCard from '~components/video-card';
import type { IBSpaceQuery, ISpaceVideo, IUpInfo } from '~types';
import { fetchBSpaceVideo } from './fetch';
import styles from './index.module.scss';

const UpSpace: FC = () => {
  const { state } = useLocation();
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
      <UpSpaceNavigate up={(state as { up: IUpInfo }).up} />
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
