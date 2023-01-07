import { Box, Grid, Typography } from "@mui/material";
import { Props } from "./types";

export const EmployeeCard = ({ employee, ...props }: Props): JSX.Element => {
    return (
        <Grid item xs={12} md={4} textAlign='center'>
            <Box
                component="img"
                sx={{ width: '100%' }}
                alt="About us 2nd img."
                src={employee.avatarurl}
            />
            <Typography variant="body2" component={'p'}>
                {employee.fullname}
            </Typography>
            <Typography variant="body2" component={'p'}>
                {employee.position}
            </Typography>
            <Typography variant="body2" component={'p'}>
                {employee.description}
            </Typography>
        </Grid>
    )
};