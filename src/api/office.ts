import axios from 'axios';
import { OfficeNameIdDto } from '../types/common/officeNameIdDto';

export async function getPublicOfficeNameIdsAxios(): Promise<OfficeNameIdDto[]> {
    return (await axios.get("/office/getpublicofficenameids")).data;
}