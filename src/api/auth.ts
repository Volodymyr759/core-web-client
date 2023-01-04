import axios from 'axios';
import { IAuth, ILoginDto } from '../types/auth';

export async function loginAxios(loginDto: ILoginDto): Promise<IAuth> {
    return (await axios.post<IAuth>("/account/LoginAsync", loginDto)).data;
}

export async function logoutAxios(email: string): Promise<void> {
    return (await axios.get("/account/LogoutAsync/" + email));
}