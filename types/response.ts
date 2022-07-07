import type { ISpaceVideo, IUpInfo } from '.';

export interface IBUpInfoResponse {
  mid: number;
  name: string;
  face: string;
  top_photo: string;
}

export interface IBSpaceResponse {
  page: {
    count: number;
    pn: number;
    ps: number;
  };
  list: {
    vlist: ISpaceVideo[];
  };
}

export interface IBVideoShotResponse {
  image: string[];
  index: number[];
}

export interface IBVideoInfoResponse {
  aid: number;
  bvid: string;
  desc: string;
  owner: IUpInfo;
  pic: string;
  title: string;
}

export type IBBulletChatResponse = string[];
