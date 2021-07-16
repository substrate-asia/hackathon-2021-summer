import axios from 'axios';


let instance;

const axiosInstance = () => {
  if (!instance) {
    instance = axios.create({
      timeout: 10000,
      // withCredentials: true,
      responseType: 'json',
    });
  }
  instance.interceptors.request.use((request) => {

    request.headers['content-type'] = "application/json";
    return request;
  });
  instance.interceptors.response.use(
    (response) => {
      return response && response.data ? response.data : response;
    }, (err) => {
    },
  );

  return instance;
};


// const host = `${document.location.protocol}//localhost:4000`;
const host = ``;

const get = urlMethod => axiosInstance(host + urlMethod).get(host + urlMethod);

const post = (urlMethod, payload) => axiosInstance(host + urlMethod).post(host + urlMethod, payload);


export default {
  get,
  post,
};
// export default axiosInstance();
