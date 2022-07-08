import { FC, MouseEvent, useMemo, useRef, useState } from 'react';
import { fetchVideoShot, fetchBulletChatShot } from '~utils';
import styles from './index.module.scss';

interface IVideoPreviewProps {
  bvid: string;
  cover: string;
  title: string;
  length: string;
}

const LENGTH = -190;

const VideoPreview: FC<IVideoPreviewProps> = (props) => {
  const { cover, title, length, bvid } = props;
  const coverRef = useRef<HTMLImageElement | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [ratio, setRatio] = useState(0);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [shotConfig, setShotConfig] = useState<{
    preview: string;
    range: number[];
    bulletChat: { text: string; width: number }[];
  }>({
    preview: '',
    range: [],
    bulletChat: []
  });
  const isPreviewShow = useMemo(
    () => shotConfig.preview && isMouseIn,
    [shotConfig.preview, isMouseIn]
  );
  const previewPosition = useMemo(
    () => shotConfig.range.findIndex((val) => ratio < val),
    [ratio, shotConfig.range]
  );

  const handleFetchShot = async () => {
    const { image, index } = await fetchVideoShot(bvid);
    const bc = await fetchBulletChatShot(bvid);

    const bulletChat = [];
    bc.forEach((item) => {
      const el = document.createElement('div');
      el.innerText = item;
      el.style.opacity = '0';
      el.style.position = 'absolute';
      document.body.appendChild(el);
      bulletChat.push({ text: item, width: el.offsetWidth });
      el.remove();
    });

    const range = [];
    const count = Math.min(index.length, 10);
    // 预览图切分分段
    for (let i = 0; i < count; i++) {
      range.push(i * Math.round(100 / count));
    }
    setShotConfig({ range, preview: image[0], bulletChat });
  };

  const handleMouseEnter = () => {
    setIsMouseIn(true);
    if (!shotConfig.preview) {
      timer.current = setTimeout(() => {
        handleFetchShot();
      }, 300);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shotConfig.preview) {
      const mouseX = e.pageX - coverRef.current.x;
      const ratio = Math.round((mouseX / coverRef.current.width) * 100);
      setRatio(ratio);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseIn(false);
    timer.current && clearTimeout(timer.current);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={coverRef}
        className={styles.cover}
        src={`${cover}@640w_400h_1c.webp`}
        alt={title}
      />
      <span className={styles.length}>{length}</span>
      <div className={styles.mask} />
      <div
        className={styles.preview}
        style={{
          opacity: isPreviewShow ? '1' : '0',
          backgroundImage: `url(https:${shotConfig.preview})`,
          backgroundPosition: `${(previewPosition - 1) * LENGTH}px 12px`
        }}
      />
      <div
        className={styles.progressWrapper}
        style={{ opacity: isPreviewShow ? 1 : 0 }}
      >
        <div className={styles.progress} style={{ width: `${ratio}%` }} />
      </div>
      <div className={styles.fakeBulletChatWrapper}>
        {shotConfig.bulletChat.map(({ text, width }, index) => {
          const isOdd = index % 2 === 0;
          return (
            <div
              key={index}
              className={styles.fakeBulletChatItem}
              style={
                isPreviewShow
                  ? {
                      top: isOdd ? 8 : 25,
                      transition: `transform 5s linear ${index * 1.25}s`,
                      transform: `translateX(-${width + 190}px)`
                    }
                  : {}
              }
            >
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoPreview;
