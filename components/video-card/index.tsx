import type { FC } from 'react';
import VideoPreview from '~components/video-preview';
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
      <VideoPreview cover={video.pic} {...video} />
      <p className={styles.title}>{video.title}</p>
    </div>
  );
};

export default VideoCard;
