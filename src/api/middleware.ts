import axios, { AxiosResponse } from 'axios'
import { ErrorStatus } from '../types/error';

export class AxiosMiddleware {
    static boot(): void {
        axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

        axios.interceptors.response.use(function (response: AxiosResponse): AxiosResponse {
            return response;
        },
            function (error) {
                switch (error.response.status) {
                    case ErrorStatus.Forbidden:
                        console.log('Forbidden error.');
                        return;
                    case ErrorStatus['Not Found']:
                        console.log('Not found error.');
                        return;
                    default:
                        console.log('Internal server error.');
                        return;
                }
            });
    }
}
