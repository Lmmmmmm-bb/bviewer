import { biliParser } from '~utils';
import type { IBSpaceQuery, IBSpaceResponse } from '~types';
import { B_API_SPACE } from './config';

export const fetchBSpaceVideo = async (query: IBSpaceQuery) => {
  return biliParser<IBSpaceQuery, IBSpaceResponse>(B_API_SPACE, {
    ps: 10,
    ...query
  });
};
