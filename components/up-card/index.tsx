import { FC, useMemo } from 'react';
import { useStorage } from '@plasmohq/storage';

import { FOLLOW_X_KEY } from '~layouts/follow/config';
import type { FollowingInfoType, IUpInfo } from '~types';

import styles from './index.module.scss';

interface IUpCardProps {
  up: FollowingInfoType;
}

const UpCard: FC<IUpCardProps> = (props) => {
  const { up } = props;
  const [follow] = useStorage<IUpInfo[]>(
    FOLLOW_X_KEY,
    (v: IUpInfo[]) => v || []
  );

  const ids = useMemo(() => follow.map((item) => item.mid), [follow]);

  return (
    <div
      className={`${styles.wrapper} ${
        ids.includes(up.mid) ? styles.select : ''
      }`}
    >
      <img className={styles.avatar} src={up.face} />
      <div className={styles.contentWrapper}>
        <h3 className={`${styles.section} ${styles.name}`} title={up.uname}>
          {up.uname}
        </h3>
        <p className={`${styles.section} ${styles.sign}`} title={up.sign}>
          {up.sign}
        </p>
      </div>
    </div>
  );
};

export default UpCard;
