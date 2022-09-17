export interface IBVideoInfoQuery {
  bvid: string;
}

export interface IBUpInfoQuery {
  mid: string;
}

export interface IBSpaceQuery {
  mid: string;
  pn: number;
  ps?: number;
}

export interface IBVideoShotQuery {
  bvid: string;
  index: number;
}

export interface IBBulletChatQuery {
  aid: string;
}

export interface IBUpFollowingQuery {
  pn: number;
  vmid: string;
}
