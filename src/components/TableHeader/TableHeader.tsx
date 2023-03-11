import { TableCell, TableHead, TableRow } from "@mui/material";
import { TableHeaderProps } from "./types";

export default function TableHeader({ children }: TableHeaderProps): JSX.Element {
    return (
        <TableHead>
            <TableRow>
                {children}
            </TableRow>
        </TableHead>
    )
}