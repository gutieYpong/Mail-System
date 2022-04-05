import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '../app/store';
import authSlice from '../features/authSlice';


const axiosService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use(async (config) => {
  // console.log(`axiosService request...`)
  const { token } = store.getState().persistedReducer.auth;

  if (token !== null) {
    config.headers.Authorization = 'Bearer ' + token;
    // console.log('[Request]', config.baseURL + config.url, JSON.stringify(token));
  }
  return config;
});

axiosService.interceptors.response.use(
  (res) => {
    // console.log('[Response]', res.config.baseURL + res.config.url, res.status, res.data);
    return Promise.resolve(res);
  },
  (err) => {
    console.log(
      '[Response]',
      err.config.baseURL + err.config.url,
      err.response.status,
      err.response.data
    );
    return Promise.reject(err);
  }
);

const refreshAuthLogic = async (failedRequest) => {
  const { refreshToken } = store.getState().persistedReducer.auth;

  if (refreshToken !== null) {
    return axios
      .post(
        '/auth/refresh/',
        {
          refresh: refreshToken,
        },
        {
          baseURL: process.env.REACT_APP_API_URL
        }
      )
      .then((resp) => {
        const { access } = resp.data;

        failedRequest.response.config.headers.Authorization = 'Bearer ' + access;
        store.dispatch(
          authSlice.actions.setAuthTokens({ token: access, refreshToken: refreshToken })
        );
        // console.log(`refresh dispatch success after....`)
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // console.log(`refresh dispatch failure before....`)
          store.dispatch(authSlice.actions.setLogout());
        }
      });
  }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url) {
  return axiosService.get(url).then((res) => res.data);
}

export default axiosService;