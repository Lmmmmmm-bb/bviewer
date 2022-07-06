import { biliParser } from '~utils';
import type { IBVideoShotQuery, IBVideoShotResponse } from '~types';
import { B_API_VIDEOSHOT } from '~components/video-card/config';

export const fetchBVideoShot = async (bvid: string) => {
  return biliParser<IBVideoShotQuery, IBVideoShotResponse>(B_API_VIDEOSHOT, {
    bvid,
    index: 1
  });
};
