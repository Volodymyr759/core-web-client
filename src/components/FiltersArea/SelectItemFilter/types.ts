import { OfficeNameIdDto } from "../../../types/common/officeNameIdDto";

export interface SelectItemFilterProps {
    items: OfficeNameIdDto[];
    label: string;
    onSelectChanged: (newValue: string) => void;
    value: string;
}