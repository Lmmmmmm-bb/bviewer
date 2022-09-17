import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Empty from '~components/empty';
import UpCard from '~components/up-card';
import { fetchUpFollowing } from '~utils';
import type { FollowingInfoType, IUpInfo } from '~types';
import UpSpaceNavigate from '~components/up-space-navigate';
import UpSpacePagination from '~components/up-space-pagination';

import styles from './index.module.scss';

const Following: FC = () => {
  const { state } = useLocation();
  const { uid } = useParams<{ uid: string }>();
  const [isPrivate, setIsPrivate] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [followList, setFollowList] = useState<FollowingInfoType[]>([]);

  const fetchFollow = async (pn = 1) => {
    setPage(pn);
    const response = await fetchUpFollowing({ vmid: uid, pn });
    if (response) {
      setTotal(Math.max(response.total - (pn - 1) * 50, 0));
      setFollowList(response.list);
    } else {
      setIsPrivate(true);
    }
  };

  useEffect(() => {
    fetchFollow();
  }, []);

  return (
    <div className={styles.wrapper}>
      <UpSpaceNavigate up={(state as { up: IUpInfo }).up} />
      {isPrivate ? (
        <Empty content='由于该用户隐私设置，关注列表不可见' />
      ) : (
        <>
          <div className={styles.contentWrapper}>
            {followList.map((item) => (
              <UpCard key={item.mid} up={item} />
            ))}
          </div>
          <UpSpacePagination
            total={total}
            onNextClick={() => fetchFollow(page + 1)}
            onPrevClick={() => fetchFollow(page - 1)}
          />
        </>
      )}
    </div>
  );
};

export default Following;
