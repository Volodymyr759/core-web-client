import { TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { TableHeaderProps } from "./types";

export default function TableHeader({ titles }: TableHeaderProps): JSX.Element {
    return (
        <TableHead>
            <TableRow>
                {titles.map((header, index) =>
                    <TableCell key={index} align="center">
                        <Typography variant="overline" gutterBottom>
                            {header}
                        </Typography>
                    </TableCell>)}
            </TableRow>
        </TableHead>
    )
}