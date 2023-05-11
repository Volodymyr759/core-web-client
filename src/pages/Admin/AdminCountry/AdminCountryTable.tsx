import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminCountryTableProps } from "./types";
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { ICountry } from "../../../types/country";
import TablePagination from "../../../components/TablePagination/TablePagination";
import TableHeader from "../../../components/TableHeader/TableHeader";
import { MessageAppearance } from "../../../components/Messages/types";
import { useState } from "react";
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog";

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
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="Edit Country" placement="top">
                                            <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: '#0072ea' }} onClick={() => onEditHandler(country.id)} />
                                        </Tooltip>
                                        <Divider orientation="vertical" flexItem />
                                        <Tooltip title="Remove Country" placement="top">
                                            <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'red' }} onClick={() => onDeleteHandler(country.id)} />
                                        </Tooltip>
                                    </div>
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