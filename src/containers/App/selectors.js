import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectAppState = (state) => state.app || initialState;

export const selectLocale = createSelector(selectAppState, (state) => state.locale);
export const selectTheme = createSelector(selectAppState, (state) => state.theme);
export const selectShortUrl = createSelector(selectAppState, (state) => state.shortUrl);
export const selectShortUrlLoading = createSelector(selectAppState, (state) => state.shortUrlLoading);
export const selectShortUrlError = createSelector(selectAppState, (state) => state.shortUrlError);
