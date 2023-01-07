import axios from 'axios';
import { IAuth, ILoginDto } from '../types/auth';

export async function loginAxios(loginDto: ILoginDto): Promise<IAuth> {
    return (await axios.post<IAuth>("/account/login", loginDto)).data;
}

export async function logoutAxios(email: string, token: string) {
    await axios.get(`/account/logout/${email}`, { headers: { Authorization: `Bearer ${token}` } });
}