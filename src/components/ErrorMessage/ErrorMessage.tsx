import { Typography } from "@mui/material";
import { Props } from "./types";

export default function ErrorMessage({ message }: Props): JSX.Element {
    return (
        <p style={{ textAlign: 'center' }}>
            <Typography variant="body2" component={'span'} sx={{ color: 'red' }}>
                {message}
            </Typography>
        </p>
    )
}