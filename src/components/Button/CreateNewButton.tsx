import { Button, Grid } from "@mui/material";
import { CreateNewButtonProps } from "./types";

export default function CreateNewButton({ onAction, children }: CreateNewButtonProps): JSX.Element {
    return (
        <Grid container justifyContent={'flex-end'} spacing={2} sx={{ margin: '20px 0' }}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                <Button variant="contained" onClick={onAction}>
                    {children}
                </Button>
            </Grid>
        </Grid>
    )
}