import { IAppTableAvatarProps } from './types';
import { Avatar, Grid, Typography } from '@mui/material';

export default function AppTableAvatar({ name, email, avatarUrl }: IAppTableAvatarProps) {
    return (
        <Grid container direction="row" justifyContent="left" alignItems="center" gap='10px'>
            <Avatar alt="Avatar" src={avatarUrl || "/static/images/avatar/2.jpg"} />
            <Grid item>
                <Typography component={'p'} sx={{ fontSize: '0.75rem;', fontWeight: '600' }}>{name}</Typography>
                <Typography component={'p'} sx={{ fontSize: '0.75rem;', fontWeight: 'normal' }}>{email}</Typography>
            </Grid>
        </Grid>
    )
}
