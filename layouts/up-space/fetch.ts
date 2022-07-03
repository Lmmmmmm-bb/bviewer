import type { IBSpaceQuery } from '~types';
import { biliParser } from '~utils';
import { B_API_SPACE } from './config';

export const fetchBSpaceVideo = async (query: IBSpaceQuery) => {
  return biliParser<IBSpaceQuery>(B_API_SPACE, { ps: 10, ...query }, 'list');
};
