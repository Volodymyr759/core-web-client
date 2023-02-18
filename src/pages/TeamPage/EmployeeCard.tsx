import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { EmployeeCardProps } from "./types";

export default function EmployeeCard({ employee, ...props }: EmployeeCardProps): JSX.Element {
    return (
        <Grid item xs={12} md={4} textAlign='center'>
            <Card elevation={16}>
                <Box
                    component="img"
                    sx={{ width: '90%' }}
                    alt="Employee photo."
                    src={employee.avatarUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {employee.fullName} - {employee.position}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {employee.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
};