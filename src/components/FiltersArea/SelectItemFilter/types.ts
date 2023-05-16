export interface SelectItemFilterProps {
    items: { id: number | string, name: string }[];
    label: string;
    onSelectChanged: (newValue: string) => void;
    value: string;
}