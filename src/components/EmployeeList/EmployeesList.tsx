import { Grid } from "@mui/material";
import EmployeeCard from "./EmployeeCard";
import { EmployeeListProps } from "./types";

export default function EmployeesList({ employees }: EmployeeListProps): JSX.Element {
    return (
        <Grid container spacing={2} className="page-chapter-container">
            {employees.map(employee => <EmployeeCard employee={employee} key={employee.id} />)}
        </Grid>
    )
}
