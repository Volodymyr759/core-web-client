import { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminCountryTableProps } from "./types";
import { ICountry } from "../../../types/country";
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";
import StyledEditIcon from "../../../components/StyledIcons/StyledEditIcon";
import StyledDeleteIcon from "../../../components/StyledIcons/StyledDeleteIcon";
import TablePagination from "../../../components/TablePagination/TablePagination";
import TableHeader from "../../../components/TableHeader/TableHeader";

export default function AdminCountryTable({ onEdit }: AdminCountryTableProps): JSX.Element {
    const { countrySearchResult, error } = useTypedSelector(state => state.country);
    const { removeCountry, setCountryPage } = useActions();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [countryIdToDelete, setCountryIdToDelete] = useState<null | number>(null);

    const onEditHandler = (id: number) => {
        const choosedCountry = countrySearchResult.itemList.find(c => c.id === id);
        const countryToUpdate: ICountry = {
            id: choosedCountry.id,
            name: choosedCountry.name,
            code: choosedCountry.code,
        }
        onEdit(countryToUpdate);
    }

    const onDeleteHandler = (id: number) => {
        setCountryIdToDelete(id);
        setTimeout(() => {
            setConfirmDialogOpen(true);
        }, 100);
    }

    if (error) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader titles={['Name', 'Code', 'Offices', 'Actions']} />
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