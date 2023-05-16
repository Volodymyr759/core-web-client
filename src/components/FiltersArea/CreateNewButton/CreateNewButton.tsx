import { Button, Grid } from "@mui/material";
import { CreateNewButtonProps } from "./types";

export default function CreateNewButton({ onAction, children }: CreateNewButtonProps): JSX.Element {

    return (
        <Grid item>
            <Button
                variant="contained"
                style={{ textTransform: 'none' }}
                onClick={onAction}>
                {children}
            </Button>
        </Grid>
    )
}