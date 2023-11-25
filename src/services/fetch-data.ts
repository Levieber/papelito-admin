import axios, { isAxiosError, type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

interface FetchOptions extends AxiosRequestConfig {
    method: "get" | "post" | "put" | "patch" | "delete";
    body?: unknown;
}

export const fetchData = async <T>(
    url: string,
    options: FetchOptions = { method: "get" }
): Promise<T | string> => {
    try {
        if (["post", "put", "patch"].includes(options.method) && options.body) {
            const response = await axiosInstance[options.method]<T>(
                url,
                options.body,
                options
            );
            return response.data;
        } else if (
            ["post", "put", "patch"].includes(options.method) &&
            !options.body
        ) {
            throw new TypeError("Missing body option");
        }

        const response = await axiosInstance[options.method]<T>(url, options);

        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.data.message) {
                return error.response?.data.message;
            }

            return error.message;
        }

        return "Error on fetch data";
    }
};
