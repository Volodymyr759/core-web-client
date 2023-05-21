import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SelectItemFilterProps } from "./types";

export default function SelectItemsFilter({ items, label, onSelectChanged, value }: SelectItemFilterProps): JSX.Element {

    let officesToSelect = items.slice();
    officesToSelect.unshift({ id: 0, name: "All Offices" });

    return (
        <Grid item sx={{ minWidth: 316, margin: "5px 0" }}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    label={label}
                    onChange={(event: SelectChangeEvent) => onSelectChanged(event.target.value)}
                >
                    {officesToSelect.map((office) => <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
    )
}