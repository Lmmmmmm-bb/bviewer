import type { ISpaceVideo } from '.';

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
