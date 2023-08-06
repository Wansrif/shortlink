import {
  DELETE_SHORT_URL,
  GET_SHORT_URL,
  SET_LOCAL,
  SET_SHORT_URL,
  SET_SHORT_URL_ERROR,
  SET_SHORT_URL_LOADING,
  SET_THEME,
} from '@containers/App/constants';

export const setLocale = (locale) => ({
  type: SET_LOCAL,
  locale,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  theme,
});

export const getShortUrl = (url) => ({
  type: GET_SHORT_URL,
  url,
});

export const setShortUrl = (shortUrl) => ({
  type: SET_SHORT_URL,
  shortUrl,
});

export const deleteShortUrl = (code) => ({
  type: DELETE_SHORT_URL,
  code,
});

export const setShortUrlLoading = (shortUrlLoading) => ({
  type: SET_SHORT_URL_LOADING,
  shortUrlLoading,
});

export const setShortUrlError = (shortUrlError) => ({
  type: SET_SHORT_URL_ERROR,
  shortUrlError,
});
