import axios from 'axios';
import { IAuth, ILoginDto, IRegisterDto } from '../types/auth';

export async function loginAxios(loginDto: ILoginDto): Promise<IAuth> {
    return (await axios.post<IAuth>("/account/login", loginDto)).data;
}

export async function logoutAxios(email: string, token: string) {
    await axios.get(`/account/logout/${email}`, { headers: { Authorization: `Bearer ${token}` } });
}

export async function registerAxios(registerDto: IRegisterDto): Promise<IRegisterDto> {
    return (await axios.post<IRegisterDto>("/account/register", registerDto)).data;
}

export async function refreshTokenAxios(accessToken: string, refreshToken: string): Promise<IAuth> {
    return (await axios.post<IAuth>("/account/refreshtoken", { accessToken, refreshToken })).data;
}

export async function confirmEmailAxios(code: string, email: string) {
    await axios.get(`/account/confirmemail?code=${code}&email=${email}`);
}