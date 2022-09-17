import { biliParser } from '.';
import type {
  IBBulletChatQuery,
  IBBulletChatResponse,
  IBSpaceQuery,
  IBSpaceResponse,
  IBUpFollowingQuery,
  IBUpFollowingResponse,
  IBUpInfoQuery,
  IBUpInfoResponse,
  IBVideoInfoQuery,
  IBVideoInfoResponse,
  IBVideoShotQuery,
  IBVideoShotResponse
} from '~types';

export const B_API_PREFIX = 'https://api.bilibili.com/x';
export const B_API_SPACE = `${B_API_PREFIX}/space/arc/search`;
export const B_API_UP_INFO = `${B_API_PREFIX}/space/acc/info`;
export const B_API_UP_FOLLOWING = `${B_API_PREFIX}/relation/followings`;
export const B_API_VIDEOSHOT = `${B_API_PREFIX}/player/videoshot`;
export const B_API_VIDEO_INFO = `${B_API_PREFIX}/web-interface/view`;
export const B_API_VIDEO_BULLET_CHAT = `${B_API_PREFIX}/v2/dm/ajax`;

export const fetchVideoInfo = async (bvid: string) =>
  biliParser<IBVideoInfoQuery, IBVideoInfoResponse>(B_API_VIDEO_INFO, {
    bvid
  });

export const fetchVideoShot = async (bvid: string) =>
  biliParser<IBVideoShotQuery, IBVideoShotResponse>(B_API_VIDEOSHOT, {
    bvid,
    index: 1
  });

export const fetchUpInfo = async (uid: string) =>
  biliParser<IBUpInfoQuery, IBUpInfoResponse>(B_API_UP_INFO, {
    mid: uid
  });

export const fetchUpSpaceInfo = async (query: IBSpaceQuery) =>
  biliParser<IBSpaceQuery, IBSpaceResponse>(B_API_SPACE, {
    ps: 10,
    ...query
  });

export const fetchBulletChatShot = async (aid: string) =>
  biliParser<IBBulletChatQuery, IBBulletChatResponse>(B_API_VIDEO_BULLET_CHAT, {
    aid
  });

export const fetchUpFollowing = async (query: IBUpFollowingQuery) =>
  biliParser<IBUpFollowingQuery, IBUpFollowingResponse>(
    B_API_UP_FOLLOWING,
    query
  );
