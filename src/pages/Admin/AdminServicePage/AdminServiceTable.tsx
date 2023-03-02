import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { useEffect } from 'react';
import { SortOrder } from '../../../types/sortOrder';
import { CompanyServiceStatus, ICompanyService } from '../../../types/companyService';
import { Divider, Switch, Tooltip } from '@mui/material';
import Spinner from '../../../components/Spinner/Spinner';
import { AdminServiceTableProps } from './types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

export default function AdminServiceTable({ openEditForm }: AdminServiceTableProps): JSX.Element {
    const { serviceSearchResult, loadingServices, errorServices } = useTypedSelector(state => state.service);
    const { getServices, setCurrentService, removeService } = useActions();

    useEffect(() => {
        getServices(100, 1, CompanyServiceStatus.All, SortOrder.Ascending);
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
        setCurrentService(serviceToUpdate);
        openEditForm();
    }

    if (errorServices) return <ErrorMessage message={errorServices} />;

    return (
        <>
            {
                loadingServices ?
                    <Spinner />
                    :
                    <TableContainer component={Paper} sx={{ margin: '20px 0' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="left">Description</TableCell>
                                    <TableCell align="left">Image Url</TableCell>
                                    <TableCell align="left">Is Active?</TableCell>
                                    <TableCell align="left">Actions</TableCell>
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