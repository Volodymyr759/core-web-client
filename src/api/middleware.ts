import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorStatus } from '../types/common/error';
import { refreshTokenAxios } from './auth';

export class AxiosMiddleware {
    static boot(): void {
        axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

        // Request interceptor for API calls
        axios.interceptors.request.use(
            async config => {
                const authFromLocalStorage = localStorage.getItem("auth");
                if (authFromLocalStorage) {
                    const keys = JSON.parse(authFromLocalStorage);
                    config.headers = {
                        'Authorization': `Bearer ${keys.tokens.accessToken}`,
                        'Accept': 'application/json'
                    }
                }
                return config;
            },
            error => {
                Promise.reject(error)
            });

        // Response interceptor for API calls
        axios.interceptors.response.use(function (response: AxiosResponse): AxiosResponse {
            return response;
        },
            async function (error: AxiosError) {
                if (!error.status) {
                    let errorMessage = "";
                    try {
                        if (error.response.status === ErrorStatus.Forbidden) {
                            errorMessage = "You are not allowed to this action.";
                            throw new Error();
                        }
                        if (error.response.status === ErrorStatus.Unauthorized) {
                            errorMessage = "Unable to refresh token, please Sign In.";
                            // Get existing tokens from localStorage and try to refresh
                            const authFromLocalStorage = JSON.parse(localStorage.getItem("auth"));
                            const authModel = await refreshTokenAxios(authFromLocalStorage.tokens.accessToken, authFromLocalStorage.tokens.refreshToken)
                            localStorage.setItem("auth", JSON.stringify(authModel));

                            // current response contains all settings needed to retry request
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + authModel.tokens.accessToken;
                            return axios(error.config);
                        }
                    } catch (error) {
                        throw new Error(errorMessage);
                    } finally {
                        errorMessage = "";
                    }
                }
                switch (error.status) {
                    case ErrorStatus['Bad Request']:
                        if (error.response && error.response.data['title']) {
                            throw new Error(error.response.data['title'])
                        }
                        throw new Error("Bad Request Error");
                    case ErrorStatus.Forbidden:
                        return;
                    case ErrorStatus['Not Found']:
                        throw new Error(error.response.data['title'] || 'Not Found Error');
                    default:
                        throw new Error('Internal server error.');
                }
            });
    }
}
