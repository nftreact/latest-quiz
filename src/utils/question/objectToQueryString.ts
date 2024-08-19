interface QueryParams {
  [key: string]: string | undefined;
}

export const objectToQueryString = <T extends QueryParams>(params: T): string => {
  const queryString = Object.entries(params)
    .filter(([key, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}=${value as any}`)
    .join('&');

  return queryString;
};
