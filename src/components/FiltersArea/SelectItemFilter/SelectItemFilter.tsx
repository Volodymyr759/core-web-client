import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SelectItemFilterProps } from "./types";

export default function SelectItemsFilter({ items, label, onSelectChanged, value }: SelectItemFilterProps): JSX.Element {

    return (
        <Grid item>
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    value={value}
                    label={label}
                    onChange={(event: SelectChangeEvent) => onSelectChanged(event.target.value)}
                >
                    {items.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
    )
}