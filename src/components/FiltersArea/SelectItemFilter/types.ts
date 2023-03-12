export interface SelectItemFilterProps {
    items: { id: number, name: string }[];
    label: string;
    onSelectChanged: (newValue: string) => void;
    value: string;
}