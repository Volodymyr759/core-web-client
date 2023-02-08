import axios from 'axios';
import { OfficeNameIdDto } from '../pages/Vacancies/types';

export async function getPublicOfficeNameIdsAxios(): Promise<OfficeNameIdDto[]> {
    return (await axios.get(`/office/getpublicofficenameids`)).data;
}