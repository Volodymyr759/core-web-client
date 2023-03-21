import axios from 'axios';
import { IMailMessage } from '../types/common/mailMessage';

export async function sendEmailAxios(email: IMailMessage): Promise<string> {
    return (await axios.post("/mailsubscriber/sendmessagetoadmin", email)).data;
}