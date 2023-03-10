import { IOffice } from "../../../types/office";

export interface AdminOfficeTableProps {
    onEdit: (office: IOffice) => void;
}

export interface AdminOfficeFormProps {
    office: IOffice;
    closeForm: () => void;
}