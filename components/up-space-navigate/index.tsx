import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { IUpInfo } from '~types';
import styles from './index.module.scss';

interface UpSpaceNavigateProps {
  up: IUpInfo;
}

const UpSpaceNavigate: FC<UpSpaceNavigateProps> = (props) => {
  const { up } = props;

  const handleVisitUp = () => {
    chrome.tabs.create({ url: `https://space.bilibili.com/${up.mid}` });
  };

  return (
    <div className={styles.wrapper}>
      <Link className={styles.back} to='/' title='返回'>
        返回
      </Link>
      <div
        className={styles.avatarWrapper}
        title={`访问 ${up.name} 主页`}
        onClick={handleVisitUp}
      >
        <p>{up.name}</p>
        <img
          className={styles.avatar}
          src={up.face}
          alt={`${up.name} 的头像`}
        />
      </div>
    </div>
  );
};

export default UpSpaceNavigate;
