import { Grid } from "@mui/material";
import { EmployeeListProps } from "./types";
import ImageCard from "../ImageCard/ImageCard";

export default function EmployeesList({ employees }: EmployeeListProps): JSX.Element {
    return (
        <Grid container spacing={2} className="page-chapter-container">
            {employees.map(employee =>
                <Grid item key={employee.id} xs={12} md={4} textAlign='center'>
                    <ImageCard
                        imageUrl={employee.avatarUrl}
                        altAttribute="Employee image"
                        title={employee.fullName}
                        subTitle={employee.position}
                        content={employee.description}
                    />
                </Grid>
            )}
        </Grid>
    )
}
