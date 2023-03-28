import axios from 'axios';
import { IAuth, IChangeEmailDto, IChangePasswordDto, ILoginDto, IRegisterDto, IResetPasswordDto } from '../types/auth';

/**
 * Changes the email of current user
 * @param changeEmailDto<IChangeEmailDto> Object of type IChangeEmailDto
 * @returns<string> Success confirmation message
 */
export async function changeEmailAxios(changeEmailDto: IChangeEmailDto): Promise<string> {
    return (await axios.post<string>("/account/changeemail", changeEmailDto)).data;
}

/**
 * Changes the password of current user
 * @param changePasswordDto<IChangePasswordDto> Object of type IChangePasswordDto
 * @returns<string> Success confirmation message
 */
export async function changePasswordAxios(changePasswordDto: IChangePasswordDto): Promise<string> {
    return (await axios.post<string>("/account/changepassword", changePasswordDto)).data;
}

export async function confirmEmailAxios(code: string, email: string) {
    await axios.get(`/account/confirmemail?code=${code}&email=${email}`);
}

export async function forgotPasswordAxios(email: string) {
    await axios.get(`/account/forgotpassword?email=${email}`);
}

export async function resetPasswordAxios(resetPasswordDto: IResetPasswordDto): Promise<string> {
    return (await axios.post<string>("/account/resetPassword", resetPasswordDto)).data;
}

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
