import { TableCell, TableHead, TableRow } from "@mui/material";
import { TableHeaderProps } from "./types";

export default function TableHeader({ titles }: TableHeaderProps): JSX.Element {
    return (
        <TableHead>
            <TableRow>
                {titles.map((header, index) =>
                    <TableCell key={index} align="center">{header}</TableCell>)}
            </TableRow>
        </TableHead>
    )
}