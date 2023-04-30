import { Card, CardContent, Grid, Typography } from "@mui/material";
import { EmployeeCardProps } from "./types";
import './styles.css';

export default function EmployeeCard({ employee }: EmployeeCardProps): JSX.Element {
    return (
        <Grid item xs={12} md={4} textAlign='center'>
            <Card elevation={16}>
                <img
                    className="employee-card-img"
                    // width='90%'
                    alt="Employee"
                    src={employee.avatarUrl}
                />
                <CardContent>
                    <p className="full-name">{employee.fullName}</p>
                    <p className="position">{employee.position}</p>
                    <Typography variant="body2" color="text.secondary">
                        {employee.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
};