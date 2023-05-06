import React from "react";
import { AutocompleteFilterProps } from "./types";
import { Autocomplete, Grid, TextField } from "@mui/material";

export default function AutocompleteFilter({ label, options, onSearch }: AutocompleteFilterProps): JSX.Element {

    return (
        <Grid item >
            <Autocomplete
                freeSolo
                disableClearable={false}
                options={options.map((option) => option.value)}
                onChange={onSearch}
                renderInput={(params) => (
                    <TextField
                        sx={{ width: 300 }}
                        {...params}
                        label={label}
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
        </Grid>
    )
}