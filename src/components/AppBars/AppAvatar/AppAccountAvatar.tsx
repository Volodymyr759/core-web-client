import { IAppAccountAvatarProps } from './types';
import { Avatar, Grid, Typography } from '@mui/material';

export default function AppAccountAvatar({ name, email, avatarUrl }: IAppAccountAvatarProps) {
    return (
        <Grid container direction="row" justifyContent="left" alignItems="center" gap='10px'>
            <Avatar alt="Avatar" src={avatarUrl || "https://volodymyr57.somee.com/uploads/admin-avatar.jpg"} />
            <Grid item>
                <Typography component={'p'} sx={{ fontSize: '0.75rem;', fontWeight: '600' }}>{name}</Typography>
                <Typography component={'p'} sx={{ fontSize: '0.75rem;', fontWeight: 'normal' }}>{email}</Typography>
            </Grid>
        </Grid>
    )
}
