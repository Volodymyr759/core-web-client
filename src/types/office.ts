import { ISearchResult } from "./common/searchResult";
import { ICountry } from "./country";
import { IEmployee } from "./employee";
import { IVacancy } from "./vacancy";

export interface IOffice {
    id: number;
    name: string;
    description: string;
    address: number;
    latitude: number;
    longitude: number;
    countryId: number;
    country?: { name: string; };
    employees?: IEmployee[];
    vacancies?: IVacancy[];
}