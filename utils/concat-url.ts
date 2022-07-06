export function concatUrlQuery<T = Record<string, string>>(
  url: string,
  query: T
) {
  const queryStr = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${url}?${queryStr}`;
}
