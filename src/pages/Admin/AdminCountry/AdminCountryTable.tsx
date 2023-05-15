import { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminCountryTableProps } from "./types";
import { ICountry } from "../../../types/country";
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material";
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";
import StyledEditIcon from "../../../components/StyledIcons/StyledEditIcon";
import StyledDeleteIcon from "../../../components/StyledIcons/StyledDeleteIcon";
import TablePagination from "../../../components/TablePagination/TablePagination";
import { OrderType } from "../../../types/common/orderType";

export default function AdminCountryTable({ onEdit }: AdminCountryTableProps): JSX.Element {
    const { countrySearchResult, sortField, error, loading } = useTypedSelector(state => state.country);
    const { removeCountry, setCountryPage, setCountrySort, setCountrySortfield } = useActions();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [countryIdToDelete, setCountryIdToDelete] = useState<null | number>(null);

    const sortableFields = ["Name", "Code"];

    const onEditHandler = (id: number) => {
        const choosedCountry = countrySearchResult.itemList.find(c => c.id === id);
        const countryToUpdate: ICountry = {
            id: choosedCountry.id,
            name: choosedCountry.name,
            code: choosedCountry.code,
            officeDtos: choosedCountry.officeDtos
        }
        onEdit(countryToUpdate);
    }

    const onDeleteHandler = (id: number) => {
        setCountryIdToDelete(id);
        setTimeout(() => { setConfirmDialogOpen(true) }, 100);
    }

    const onSortFieldHandler = (field: string) => {
        field === sortField ?
            setCountrySort(countrySearchResult.order === OrderType.Ascending ? OrderType.Descending : OrderType.Ascending) :
            setCountrySortfield(field);
    }

    if (error) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }} className={loading ? "loading-opacity" : ""}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {["Name", "Code", "Offices", "Actions"].map((field) => {
                                return (
                                    <TableCell key={field} align="center">
                                        <Typography variant="overline" gutterBottom>
                                            {field}
                                        </Typography>
                                        {sortableFields.filter(f => f === field).length > 0 &&
                                            <TableSortLabel
                                                active={sortField === field}
                                                direction={countrySearchResult.order === OrderType.Ascending ? "asc" : "desc"}
                                                onClick={() => onSortFieldHandler(field)}
                                            />}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countrySearchResult.itemList.map((country) => (
                            <TableRow
                                key={country.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{country.name}</TableCell>
                                <TableCell align="left">{country.code}</TableCell>
                                <TableCell align="left">{
                                    country.officeDtos &&
                                    country.officeDtos.map(office => {
                                        return <p key={office.name}><span>{office.name + ', ' + office.address}</span></p>
                                    })
                                }</TableCell>
                                <TableCell align="center">
                                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                        <StyledEditIcon tooltipTitle="Edit Country" onEdit={() => onEditHandler(country.id)} />
                                        <Divider orientation="vertical" flexItem />
                                        <StyledDeleteIcon tooltipTitle="Remove Country" onDelete={() => onDeleteHandler(country.id)} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                count={Math.ceil(countrySearchResult.totalItemCount / countrySearchResult.pageSize)}
                onChangePage={(value: number) => setCountryPage(value)}
            />
            {confirmDialogOpen && <AppDeleteConfirmDialog onCancel={() => setConfirmDialogOpen(false)} onDelete={() => removeCountry(countryIdToDelete)} />}
        </>
    )
}