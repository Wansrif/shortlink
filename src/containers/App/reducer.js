import { produce } from 'immer';

import {
  DELETE_SHORT_URL,
  SET_LOCAL,
  SET_SHORT_URL,
  SET_SHORT_URL_ERROR,
  SET_SHORT_URL_LOADING,
  SET_THEME,
} from '@containers/App/constants';

export const initialState = {
  locale: 'id',
  theme: 'light',
  shortUrl: [],
  shortUrlLoading: false,
  shortUrlError: {},
};

export const storedKey = ['locale', 'theme', 'shortUrl'];

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCAL:
        draft.locale = action.locale;
        break;
      case SET_THEME:
        draft.theme = action.theme;
        break;
      case SET_SHORT_URL:
        draft.shortUrl = [...draft.shortUrl, action.shortUrl];
        break;
      case DELETE_SHORT_URL:
        draft.shortUrl = draft.shortUrl.filter((item) => item.code !== action.code);
        break;
      case SET_SHORT_URL_LOADING:
        draft.shortUrlLoading = action.shortUrlLoading;
        break;
      case SET_SHORT_URL_ERROR:
        draft.shortUrlError = action.shortUrlError;
        break;
    }
  });

export default appReducer;
