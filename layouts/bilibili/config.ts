export const matchBvidReg =
  /^https:\/\/www.bilibili.com\/video\/(?<bvid>[A-Za-z0-9]+)/;
export const matchUidReg = /^https:\/\/space.bilibili.com\/(?<uid>[0-9]+)/;

export const B_API_PREFIX = 'https://api.bilibili.com/x';
export const B_API_VIDEO_INFO = `${B_API_PREFIX}/web-interface/view`;
export const B_API_UP_INFO = `${B_API_PREFIX}/space/acc/info`;
