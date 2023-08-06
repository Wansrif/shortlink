import { takeLatest, call, put } from 'redux-saga/effects';

import { getShortUrl } from '@domain/api';
import { setShortUrl, setShortUrlLoading, setShortUrlError } from '@containers/App/actions';

import { GET_SHORT_URL } from '@containers/App/constants';

export function* doGetShortUrl({ url }) {
  yield put(setShortUrlLoading(true));
  try {
    const shortUrl = yield call(getShortUrl, url);
    if (shortUrl?.result) {
      yield put(setShortUrlError(null));
      yield put(setShortUrl(shortUrl.result));
    }
  } catch (err) {
    const { response } = err;
    const error = response?.data?.error;
    const errorCode = response?.data?.error_code;
    yield put(setShortUrlError({ error, errorCode }));
  }
  yield put(setShortUrlLoading(false));
}

export default function* appSaga() {
  yield takeLatest(GET_SHORT_URL, doGetShortUrl);
}
