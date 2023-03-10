import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { AdminOfficeTableProps } from "./types";
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { IOffice } from "../../../types/office";
import TablePagination from "../../../components/TablePagination/TablePagination";

export default function AdminOfficeTable({ onEdit }: AdminOfficeTableProps): JSX.Element {
    const { officeSearchResult, error } = useTypedSelector(state => state.office);
    const { removeOffice, setOfficePage } = useActions();

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

    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {['Name', 'Description', 'Address', 'Country', 'Vacancies', 'Actions'].map((header, index) =>
                                <TableCell key={index} align="center">{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {officeSearchResult.itemList.map((office) => (
                            <TableRow
                                key={office.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{office.name}</TableCell>
                                <TableCell align="left">{office.description.slice(0, 15).concat('...')}</TableCell>
                                <TableCell align="left">{office.address.slice(0, 15).concat('...')}</TableCell>
                                <TableCell align="center">{office.countryDto?.code}</TableCell>
                                <TableCell align="center">{office.vacancyDtos?.length}</TableCell>
                                <TableCell align="center">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Tooltip title="Edit Office" placement="top">
                                            <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: '#0072ea' }} onClick={() => onEditHandler(office.id)} />
                                        </Tooltip>
                                        <Divider orientation="vertical" flexItem />
                                        <Tooltip title="Remove Office" placement="top">
                                            <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'red' }} onClick={() => removeOffice(office.id)} />
                                        </Tooltip>
                                    </div>
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
        </>
    )
}