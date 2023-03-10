import axios from 'axios';
import { IMailMessage } from '../types/common/mailMessage';

export async function sendEmailAxios(email: IMailMessage): Promise<void> {
    return (await axios.post("/somewhere/send", email)).data;
}