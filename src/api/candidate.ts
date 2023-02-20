import axios from 'axios';
import { ICandidate } from '../types/candidate';

export async function createCandidateAxios(candidate: ICandidate): Promise<void> {
    return (await axios.post("/candidate/create", candidate)).data;
}