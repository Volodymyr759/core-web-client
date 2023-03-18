import { Typography } from "@mui/material";
import { ErrorMessageProps } from "./types";

export default function ErrorMessage({ message }: ErrorMessageProps): JSX.Element {
    return (
        <p style={{ textAlign: 'center' }}>
            <Typography variant="body2" component={'span'} sx={{ color: 'red' }}>
                {message}
            </Typography>
        </p>
    )
}