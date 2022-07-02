import type { FC } from 'react';
import { useStorage } from '@plasmohq/storage';
import type { IUpInfo } from '~types/space-video';
import { FOLLOW_X_KEY } from '~layouts/follow/config';
import styles from './index.module.scss';

interface UpAvatarProps {
  up: IUpInfo;
}

const UpAvatar: FC<UpAvatarProps> = (props) => {
  const { up } = props;
  const [follow, setFollow] = useStorage<IUpInfo[]>(
    FOLLOW_X_KEY,
    (v) => v || []
  );

  const handleVisitUp = () => {
    chrome.tabs.create({
      url: `https://space.bilibili.com/${up.mid}`
    });
  };

  const handleRemoveUp = () => {
    setFollow(follow.filter((v) => v.mid !== up.mid));
  };

  return (
    <div className={styles.wrapper} title={`访问 ${up.name}`}>
      <div className={styles.innerWrapper} onClick={handleVisitUp}>
        <img className={styles.avatar} src={up.face} alt='up avatar' />
        <p className={styles.upName}>{up.name}</p>
      </div>
      <button
        className={`basic-btn ${styles.remove}`}
        title={`删除 ${up.name}`}
        onClick={handleRemoveUp}
      >
        删除
      </button>
    </div>
  );
};

export default UpAvatar;
