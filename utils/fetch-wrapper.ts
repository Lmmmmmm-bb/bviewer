import { concatUrlQuery } from '.';

export async function biliParser<T = Record<string, string>, R = any>(
  origin: string,
  query: T,
  field?: string
): Promise<R> {
  const url = concatUrlQuery(origin, query);
  const { data } = await fetchGet(url);

  return field ? data[field] : data;
}

export async function fetchGet(url: string) {
  const response = await fetch(url);
  return response.json();
}
