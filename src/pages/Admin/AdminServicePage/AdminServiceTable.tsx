import { useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { OrderType } from '../../../types/common/orderType';
import { CompanyServiceStatus, ICompanyService } from '../../../types/companyService';
import { AdminServiceTableProps } from './types';
import { Divider, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Spinner from '../../../components/Spinner/Spinner';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

export default function AdminServiceTable({ onEdit }: AdminServiceTableProps): JSX.Element {
    const { serviceSearchResult, loading, error } = useTypedSelector(state => state.service);
    const { getServices, removeService } = useActions();

    useEffect(() => {
        getServices(100, 1, CompanyServiceStatus.All, OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    if (error) return <ErrorMessage message={error} />;

    return (
        <>
            {
                loading ?
                    <Spinner />
                    :
                    <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    {['Title', 'Description', 'Image Url', 'Is Active?', 'Office', 'Actions'].map((header, index) =>
                                        <TableCell key={index} align="center">{header}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {serviceSearchResult.itemList.map((service) => (
                                    <TableRow
                                        key={service.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {service.title}
                                        </TableCell>
                                        <TableCell align="left">{service.description.slice(0, 50).concat('...')}</TableCell>
                                        <TableCell align="left">{service.imageUrl.slice(0, 15).concat('...')}</TableCell>
                                        <TableCell align="left">
                                            <Switch checked={service.isActive} disabled={true} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <div style={{ display: 'flex' }}>
                                                <Tooltip title="Edit Company Service" placement="top">
                                                    <EditIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: '#0072ea' }} onClick={() => onEditHandler(service.id)} />
                                                </Tooltip>
                                                <Divider orientation="vertical" flexItem />
                                                <Tooltip title="Remove Company Service" placement="top">
                                                    <DeleteIcon sx={{ cursor: 'pointer', margin: '0 5px', fill: 'red' }} onClick={() => removeService(service.id)} />
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
}