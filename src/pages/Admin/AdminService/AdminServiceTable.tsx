import { useState } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { ICompanyService } from '../../../types/companyService';
import { AdminServiceTableProps } from './types';
import { Box, Divider, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import AppDeleteConfirmDialog from '../../../components/AppDeleteConfirmDialog/AppDeleteConfirmDialog';
import ErrorMessage from '../../../components/Messages/ErrorMessage';
import { MessageAppearance } from '../../../components/Messages/types';
import StyledEditIcon from '../../../components/StyledIcons/StyledEditIcon';
import StyledDeleteIcon from '../../../components/StyledIcons/StyledDeleteIcon';
import TableHeader from '../../../components/TableHeader/TableHeader';
import TablePagination from '../../../components/TablePagination/TablePagination';

export default function AdminServiceTable({ onEdit }: AdminServiceTableProps): JSX.Element {
    const { serviceSearchResult, error } = useTypedSelector(state => state.service);
    const { removeService, updateServiceIsActiveStatus, setServicePage } = useActions();
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [serviceIdToDelete, setServiceIdToDelete] = useState<null | number>(null);

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

    if (error) return <ErrorMessage appearance={MessageAppearance.REGULAR}>{error}</ErrorMessage>;

    return (
        <>
            <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHeader titles={['Title', 'Description', 'Image Url', 'Is Active?', 'Actions']} />
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