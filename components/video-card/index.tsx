import type { FC } from 'react';
import type { ISpaceVideo } from '~types';
import styles from './index.module.scss';

interface IVideoCardProps {
  video: ISpaceVideo;
}

const VideoCard: FC<IVideoCardProps> = (props) => {
  const { video } = props;

  const handlePlayVideo = () => {
    chrome.tabs.create({ url: `https://www.bilibili.com/video/${video.bvid}` });
  };

  return (
    <div
      className={styles.wrapper}
      title={video.title}
      onClick={handlePlayVideo}
    >
      <img className={styles.preview} src={video.pic} alt='视频封面' />
      <p className={styles.title}>{video.title}</p>
    </div>
  );
};

export default VideoCard;
