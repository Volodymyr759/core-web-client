import { Typography } from "@mui/material";
import { Props } from './types';

export default function PageHeader({ title, text }: Props): JSX.Element {
    return (
        <>
            <Typography variant="h4" component={'p'} sx={{ paddingTop: '20px', fontWeight: 600, textAlign: 'center' }}>
                {title}
            </Typography>
            <br />
            <Typography variant="body2" component={'p'} sx={{ textAlign: 'center' }}>
                {text}
            </Typography>
        </>
    )
};