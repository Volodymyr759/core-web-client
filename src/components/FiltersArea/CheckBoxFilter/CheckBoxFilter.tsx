import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { ChangeEvent } from "react";
import { CheckBoxFilterProps } from "./types";


export default function CheckBoxFilter({ label, onCheck, isChecked }: CheckBoxFilterProps): JSX.Element {

    return (
        <Grid item>
            <FormControlLabel
                control={
                    <Checkbox
                        onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => onCheck(checked)}
                        checked={isChecked}
                    />}
                label={label} />
        </Grid>
    )
}