import { Grid, Typography } from "@mui/material";
import { MessageAppearance, MessageProps } from "./types";
import './styles.css';

export default function SuccessMessage({ children, appearance }: MessageProps): JSX.Element {
    let cssClass: string;
    switch (appearance) {
        case MessageAppearance.LARGE:
            cssClass = 'success-message-large';
            break;
        default:
            cssClass = 'success-message-regular';
    }

    return (
        <Grid container
            direction="row"
            justifyContent="center"
            my={appearance === MessageAppearance.LARGE ? 5 : 1}
        >
            <Typography
                variant={appearance === MessageAppearance.LARGE ? "h6" : 'body2'}
                component={'span'}
                className={cssClass}
            >
                {children}
            </Typography>
        </Grid>
    )
}