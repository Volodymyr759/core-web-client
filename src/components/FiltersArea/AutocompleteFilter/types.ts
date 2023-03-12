import React from "react";

export interface AutocompleteFilterProps {
    label: string;
    options: { value: string }[];
    onSearch: (event: React.SyntheticEvent, values: string[]) => void;
}