import { Typography } from "@mui/material";
import { Props } from "./types";

export const ErrorMessage = ({ message }: Props): JSX.Element => {
    return (
        <>
            <Typography variant="body2" component={'p'} sx={{ textAlign: 'center', color: 'red' }}>
                {message}
            </Typography>
        </>
    )

}