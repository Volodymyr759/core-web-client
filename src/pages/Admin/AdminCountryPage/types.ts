import { ICountry } from "../../../types/country";

export interface AdminCountryTableProps {
    onEdit: (country: ICountry) => void;
}

export interface AdminCountryFormProps {
    country: ICountry;
    closeForm: () => void;
}