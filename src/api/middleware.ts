import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorStatus } from '../types/error';

export class AxiosMiddleware {
    static boot(): void {
        axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

        axios.interceptors.response.use(function (response: AxiosResponse): AxiosResponse {
            return response;
        },
            function (error: AxiosError) {
                switch (error.status) {
                    case ErrorStatus['Bad Request']:
                        throw new Error(error.response.data.toString());
                    case ErrorStatus.Forbidden:
                        return;
                    case ErrorStatus['Not Found']:
                        throw new Error(error.response.data.toString());
                    default:
                        throw new Error('Internal server error.');
                }
            });
    }
}
