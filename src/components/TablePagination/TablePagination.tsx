import { Box, Pagination } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { TablePaginationProps } from "./types";

export default function TablePagination({ count, onChangePage }: TablePaginationProps): JSX.Element {
    const [page, setPage] = useState(1);
    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        onChangePage(value);
        setPage(value);
    };

    return (
        <Box mt={3} mb={3} display="flex" justifyContent={"center"} >
            <Pagination count={count} page={page} onChange={handleChange} />
        </Box>
    )
}