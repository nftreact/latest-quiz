interface ParsedQueryParams {
  [key: string]: string;
}

export const parseQueryParams = (queryString: string): ParsedQueryParams => {
  const params: ParsedQueryParams = {};

  if (queryString) {
    const pairs = queryString.split('&');

    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      if (key && value) {
        params[key] = value;
      }
    }
  }

  return params;
};
