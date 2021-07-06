import axios from "axios";

// 请求环境配置
// if (process.env.NODE_ENV === "devlopment") {
//     axios.defaults.baseURL = "";
// }
// else if (process.env.NODE_ENV === "debug") {
//     axios.defaults.baseURL = "";
// } else if (process.env.NODE_ENV === "production") {
//     axios.defaults.baseURL = "";
// }

axios.defaults.baseURL ='https://private-f7f12f4-xpander.apiary-mock.com'
// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        config.headers = {
            "Content-Type": "application/json; charset=utf-8;text/plain",
        };

        return config;
    },
    (error) => {
        return Promise.error(error);
    },
);

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
           return response;
    },

    (error) => {
        // console.log("error", error);
    },
);

// 封装get方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

// 封装post方法
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
