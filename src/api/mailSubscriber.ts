import axios from 'axios';
import { IMailSubscriber } from '../types/mailSubscriber';

export async function subscribeAxios(mailSubscriber: IMailSubscriber): Promise<IMailSubscriber> {
    return (await axios.post<IMailSubscriber>('/MailSubscriber/Subscribe', mailSubscriber)).data;
}