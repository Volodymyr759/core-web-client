import { useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminOfficeTableProps } from "./types";
import { IOffice } from "../../../types/office";
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import AppDeleteConfirmDialog from "../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import { MessageAppearance } from "../../../components/Messages/types";
import StyledEditIcon from "../../../components/StyledIcons/StyledEditIcon";
import StyledDeleteIcon from "../../../components/StyledIcons/StyledDeleteIcon";
import TablePagination from "../../../components/TablePagination/TablePagination";
import TableHeader from "../../../components/TableHeader/TableHeader";

export default function AdminOfficeTable({ onEdit }: AdminOfficeTableProps): JSX.Element {
    const { officeSearchResult, error } = useTypedSelector(state => state.office);
    const { removeOffice, setOfficePage } = useActions();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [officeIdToDelete, setOfficeIdToDelete] = useState<null | number>(null);

    const onEditHandler = (id: number) => {
        const choosedOffice = officeSearchResult.itemList.find(c => c.id === id);
        const officeToUpdate: IOffice = {
            id: choosedOffice.id,
            name: choosedOffice.name,
            description: choosedOffice.description,
            address: choosedOffice.address,
            latitude: choosedOffice.latitude,
            longitude: choosedOffice.longitude,
            countryId: choosedOffice.countryId
        };
        onEdit(officeToUpdate);
    }

    const onDeleteHandler = (id: number) => {
        setOfficeIdToDelete(id);
        setTimeout(() => {
            setConfirmDialogOpen(true);
        }, 100);
    }

    if (error) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader titles={['Name', 'Description', 'Address', 'Country', 'Vacancies', 'Actions']} />
                    <TableBody>
                        {officeSearchResult.itemList.map((office) => (
                            <TableRow
                                key={office.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{office.name}</TableCell>
                                <TableCell align="left">
                                    {office.description.length > 18 ?
                                        office.description.slice(0, 15).concat('...') : office.description
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    {office.address.length > 18 ?
                                        office.address.slice(0, 15).concat('...') : office.address
                                    }
                                    </TableCell>
                                <TableCell align="center">{office.countryDto?.code}</TableCell>
                                <TableCell align="center">{office.vacancyDtos?.length}</TableCell>
                                <TableCell align="center">
                                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                        <StyledEditIcon tooltipTitle="Edit Office" onEdit={() => onEditHandler(office.id)} />
                                        <Divider orientation="vertical" flexItem />
                                        <StyledDeleteIcon tooltipTitle="Remove Office" onDelete={() => onDeleteHandler(office.id)} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                count={Math.ceil(officeSearchResult.totalItemCount / officeSearchResult.pageSize)}
                onChangePage={(value: number) => setOfficePage(value)}
            />
            {confirmDialogOpen && <AppDeleteConfirmDialog onCancel={() => setConfirmDialogOpen(false)} onDelete={() => removeOffice(officeIdToDelete)} />}
        </>
    )
}