import { SearchTextFilterProps } from "./types";
import { Grid, TextField } from "@mui/material";

export default function SearchText({ title, onSearch }: SearchTextFilterProps): JSX.Element {
    return (
        <Grid item sx={{ margin: "5px 0" }}>
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