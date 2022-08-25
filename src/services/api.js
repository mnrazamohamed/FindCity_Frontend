import axios from "axios";
import { store } from "../store";
import { authActions } from "../store/authSlice";

const API = axios.create({ baseURL: 'https://thefindcity.herokuapp.com/API/V1/', });

API.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${store.getState().auth.token}`;
    return config;
  },
  (error) => { console.log(error); }
);

API.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      if (store.getState().auth.token) {
        const access_token = await API.post("/user/refreshToken")
        store.dispatch(authActions.set({ ...store.getState().auth, token: access_token.data.data.newToken }));
        error.config.headers["authorization"] = "Bearer " + access_token.data.data.newToken;
        return axios(error.config);
      }
      store.dispatch(authActions.reset())
      Promise.reject(error)
    }
  }
);

export default API;
