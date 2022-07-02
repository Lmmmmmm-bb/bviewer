import { useEffect, useState } from 'react';
import { matchBvidReg, matchUidReg } from '~components/bilibili/config';
import type { FetchType } from '~types';
import { queryCurrentTab } from '~utils';

export const useFetchType = () => {
  const [fetchType, setFetchType] = useState<FetchType>('unusable');

  const getCurrentFetchType = async () => {
    const current = await queryCurrentTab();
    if (current.url.match(matchBvidReg)) {
      setFetchType('preview');
    } else if (current.url.match(matchUidReg)) {
      setFetchType('cover');
    } else {
      setFetchType('unusable');
    }
  };

  useEffect(() => {
    getCurrentFetchType();
  }, []);

  return fetchType;
};
