import {BASE_URL} from "../App";

export default class HttpClient {
    static get<T>(path: string) {
        return new Promise<T>(function (resolve, reject) {
            fetch(BASE_URL + path)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText)
                    }
                    return response.json()
                })
                .then(data => {
                    if (!data.success) {
                        throw Error(data.msg);
                    } else {
                        resolve(data.data);
                    }
                })
                .catch(error => {
                    reject(error)
                });
        });


    }

// without response sucess check
    static get2<T>(path: string) {
        return new Promise<T>(function (resolve, reject) {
            fetch(BASE_URL + path)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText)
                    }
                    resolve(response.json());
                })
                .catch(error => {
                    reject(error)
                });
        });


    }
}