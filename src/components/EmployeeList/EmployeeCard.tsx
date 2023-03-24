import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { EmployeeCardProps } from "./types";
import './styles.css';

export default function EmployeeCard({ employee }: EmployeeCardProps): JSX.Element {
    return (
        <Grid item xs={12} md={4} textAlign='center'>
            <Card elevation={16}>
                <Box
                    component="img"
                    sx={{ width: '90%', paddingTop: '15px' }}
                    alt="Employee photo."
                    src={employee.avatarUrl}
                />
                <CardContent>
                    {/* <Typography gutterBottom variant="h5" component="div">
                        {employee.fullName} - {employee.position}
                    </Typography> */}
                    <p id="full-name">{employee.fullName}</p>
                    <p id="position">{employee.position}</p>
                    <Typography variant="body2" color="text.secondary">
                        {employee.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
};