import Cookies from 'universal-cookie';

// Function to set cookies from an object
export const setCookies = (
  cookieObject: Record<string, string | undefined | number>,
  options = {},
  cookiesStore: Cookies,
) => {
  const cookies = cookiesStore;

  Object.entries(cookieObject).forEach(([key, value]) => {
    cookies.set(key, value, {
      path: '/',
      maxAge: 1800,
    });
  });
};

// Function to get cookies as an object
export const getCookies = () => {
  const cookies = new Cookies();
  return cookies.getAll();
};

export const resetAllCookies = () => {
  const cookies = new Cookies();
  const allCookies = cookies.getAll();

  Object.keys(allCookies).forEach((cookieName) => {
    cookies.remove(cookieName);
  });
};
