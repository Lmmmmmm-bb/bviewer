import { FC, KeyboardEvent, useRef } from 'react';
import { useStorage } from '@plasmohq/storage';
import { useFetchType } from '~hooks';
import type { IUpInfo } from '~types';
import { uniqByKey, fetchUpInfo } from '~utils';
import UpAvatar from '~components/up-avatar';
import BiliBili from '~components/bilibili';
import { FOLLOW_X_KEY } from './config';
import styles from './index.module.scss';

const Follow: FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [follow, setFollow] = useStorage<IUpInfo[]>(
    FOLLOW_X_KEY,
    (v) => v || []
  );
  const fetchType = useFetchType();

  const handleFollowUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const uid = e.currentTarget.value;
      if (uid && !follow.some((v) => v.mid.toString() === uid)) {
        const { name, mid, face } = await fetchUpInfo(uid);
        setFollow(uniqByKey([...follow, { name, mid, face }], 'mid'));
      }
      inputRef.current && (inputRef.current.value = '');
    }
  };

  return (
    <div className={styles.wrapper}>
      {fetchType !== 'unusable' && <BiliBili />}
      <input
        ref={inputRef}
        className={styles.uidInput}
        type='number'
        placeholder='通过 UID 添加'
        title='按 Enter 添加'
        onKeyUp={handleFollowUp}
        autoFocus
      />
      {follow.map((up) => (
        <UpAvatar key={up.mid} up={up} />
      ))}
    </div>
  );
};

export default Follow;
