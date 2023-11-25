import { axiosInstance } from "./fetch-data";

export class TokenService {
    static key = "@papelito/token";

    static save(token: string) {
        localStorage.setItem(this.key, token);
        axiosInstance.defaults.headers.common.Authorization = token;
    }

    static get() {
        const storaged = localStorage.getItem(this.key);

        if (!storaged) {
            return null;
        }

        return storaged;
    }

    static remove() {
        localStorage.removeItem(this.key);
        axiosInstance.defaults.headers.common.Authorization = undefined;
    }
}
