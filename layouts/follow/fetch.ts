import { B_API_UP_INFO } from '~components/bilibili/config';
import type { IBUpInfoQuery, IUpInfo, IBUpInfoResponse } from '~types';
import { biliParser } from '~utils';

export const fetchUpInfo = async (uid: string): Promise<IUpInfo> => {
  return biliParser<IBUpInfoQuery, IBUpInfoResponse>(B_API_UP_INFO, {
    mid: uid
  });
};
