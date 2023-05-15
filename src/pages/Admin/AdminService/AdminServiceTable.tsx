import { useState } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { ICompanyService } from '../../../types/companyService';
import { AdminServiceTableProps } from './types';
import { Box, Divider, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog';
import ErrorMessage from '../../../components/Messages/ErrorMessage';
import { MessageAppearance } from '../../../components/Messages/types';
import StyledEditIcon from '../../../components/StyledIcons/StyledEditIcon';
import StyledDeleteIcon from '../../../components/StyledIcons/StyledDeleteIcon';
import TablePagination from '../../../components/TablePagination/TablePagination';
import { OrderType } from '../../../types/common/orderType';

export default function AdminServiceTable({ onEdit }: AdminServiceTableProps): JSX.Element {
    const { serviceSearchResult, sortField, error, loading } = useTypedSelector(state => state.service);
    const { removeService, updateServiceIsActiveStatus, setServicePage, setServiceSort, setServiceSortfield } = useActions();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [serviceIdToDelete, setServiceIdToDelete] = useState<null | number>(null);

    const sortableFields = ["Title", "Description"];

    const onEditHandler = (id: number) => {
        const choosedService = serviceSearchResult.itemList.find(s => s.id === id);
        const serviceToUpdate: ICompanyService = {
            id: choosedService.id,
            title: choosedService.title,
            description: choosedService.description,
            imageUrl: choosedService.imageUrl,
            isActive: choosedService.isActive
        }
        onEdit(serviceToUpdate);
    }

    const onChangeIsActive = (id: number) => {
        const choosedService = serviceSearchResult.itemList.find(s => s.id === id);
        const serviceToUpdate: ICompanyService = { ...choosedService };
        serviceToUpdate.isActive = !choosedService.isActive;
        updateServiceIsActiveStatus(id, serviceToUpdate);
    }

    const onDeleteHandler = (id: number) => {
        setServiceIdToDelete(id);
        setTimeout(() => {
            setConfirmDialogOpen(true);
        }, 100);
    }

    const onSortFieldHandler = (field: string) => {
        field === sortField ?
            setServiceSort(serviceSearchResult.order === OrderType.Ascending ? OrderType.Descending : OrderType.Ascending) :
            setServiceSortfield(field);
    }

    if (error) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }} className={loading ? "loading-opacity" : ""}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {/* <TableHeader titles={['Title', 'Description', 'Image Url', 'Is Active?', 'Actions']} /> */}
                    <TableHead>
                        <TableRow>
                            {["Title", "Description", "Image Url", "Is Active?", "Actions"].map((field) => {
                                return (
                                    <TableCell key={field} align="center">
                                        <Typography variant="overline" gutterBottom>
                                            {field}
                                        </Typography>
                                        {sortableFields.filter(f => f === field).length > 0 &&
                                            <TableSortLabel
                                                active={sortField === field}
                                                direction={serviceSearchResult.order === OrderType.Ascending ? "asc" : "desc"}
                                                onClick={() => onSortFieldHandler(field)}
                                            />}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {serviceSearchResult.itemList.map((service) => (
                            <TableRow
                                key={service.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    {service.title}
                                </TableCell>
                                <TableCell align="left">
                                    {service.description.length > 53 ?
                                        service.description.slice(0, 50).concat('...') : service.description
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    {service.imageUrl.length > 18 ?
                                        service.imageUrl.slice(0, 15).concat('...') : service.imageUrl
                                    }
                                </TableCell>
                                <TableCell align="left">
                                    <Switch checked={service.isActive} onClick={() => onChangeIsActive(service.id)} />
                                </TableCell>
                                <TableCell align="center">
                                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                        <StyledEditIcon tooltipTitle="Edit Company Service" onEdit={() => onEditHandler(service.id)} />
                                        <Divider orientation="vertical" flexItem />
                                        <StyledDeleteIcon tooltipTitle="Remove Service" onDelete={() => onDeleteHandler(service.id)} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                count={Math.ceil(serviceSearchResult.totalItemCount / serviceSearchResult.pageSize)}
                onChangePage={(value: number) => setServicePage(value)}
            />
            {confirmDialogOpen && <AppDeleteConfirmDialog onCancel={() => setConfirmDialogOpen(false)} onDelete={() => removeService(serviceIdToDelete)} />}
        </>
    )
}