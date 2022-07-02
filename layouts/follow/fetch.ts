import { B_API_UP_INFO } from '~components/bilibili/config';
import type { IBSpaceQuery, IBUpInfoQuery } from '~types';
import type { IUpInfo } from '~types/space-video';
import { biliParser } from '~utils';
import { B_API_SPACE } from './config';

export const fetchBSpaceVideo = async (query: IBSpaceQuery) => {
  return biliParser<IBSpaceQuery>(B_API_SPACE, query, 'list');
};

export const fetchUpInfo = async (uid: string): Promise<IUpInfo> => {
  return biliParser<IBUpInfoQuery>(B_API_UP_INFO, { mid: uid });
};
