import { SearchTextFilterProps } from "./types";
import { Grid, TextField } from "@mui/material";

export default function SearchText({ title, onSearch }: SearchTextFilterProps): JSX.Element {

    return (
        <Grid item>
            <TextField
                label={title}
                type="text"
                margin="normal"
                fullWidth
                onChange={(event) => onSearch(event.target.value)}
            />
        </Grid>
    )
}