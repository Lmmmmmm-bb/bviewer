import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Empty from '~components/empty';
import { fetchUpSpaceInfo } from '~utils';
import VideoCard from '~components/video-card';
import UpSpaceNavigate from '~components/up-space-navigate';
import UpSpacePagination from '~components/up-space-pagination';
import type { IBSpaceQuery, ISpaceVideo, IUpInfo } from '~types';

import styles from './index.module.scss';

const UpSpace: FC = () => {
  const { state } = useLocation();
  const { uid } = useParams<{ uid: string }>();
  const [totalVideo, setTotalVideo] = useState(0);
  const [videoList, setVideoList] = useState<ISpaceVideo[]>([]);

  const fetchVideoList = async (query: Omit<IBSpaceQuery, 'mid'>) => {
    const {
      list: { vlist },
      page: { count }
    } = await fetchUpSpaceInfo({ mid: uid, ...query });
    setVideoList(vlist);
    setTotalVideo(count);
  };

  const handlePageClick = (page: number) => {
    fetchVideoList({ pn: page });
    scrollTo(0, 0);
  };

  useEffect(() => {
    fetchVideoList({ pn: 1 });
  }, []);

  return (
    <div className={styles.wrapper}>
      <UpSpaceNavigate up={(state as { up: IUpInfo }).up} />
      {videoList.length === 0 ? (
        <Empty content='空间主人还没有投过视频哦~~' />
      ) : (
        <div className={styles.videoWrapper}>
          {videoList.map((video) => (
            <VideoCard key={video.bvid} video={video} />
          ))}
        </div>
      )}
      <UpSpacePagination
        total={totalVideo}
        onPrevClick={handlePageClick}
        onNextClick={handlePageClick}
      />
    </div>
  );
};

export default UpSpace;
