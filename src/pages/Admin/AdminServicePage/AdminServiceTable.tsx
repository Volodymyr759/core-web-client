import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import React, { useEffect } from 'react';
import { SortOrder } from '../../../types/sortOrder';
import { CompanyServiceStatus } from '../../../types/companyService';
import { Switch } from '@mui/material';
import Spinner from '../../../components/Spinner/Spinner';

export default function AdminServiceTable(): JSX.Element {
    const { errorServices, serviceSearchResult, loadingServices } = useTypedSelector(state => state.service);
    const { getServices } = useActions();

    useEffect(() => {
        getServices(100, 1, CompanyServiceStatus.All, SortOrder.Ascending);
    }, [])

    const changeIsActiveHandler = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        alert('Change isActive is not implemented yet, id: ' + id);
        console.log('event.target.value: ', event.target.value);
    }

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
                                        <TableCell align="left">{service.description.slice(0, 50)}</TableCell>
                                        <TableCell align="left">{service.imageUrl.slice(0, 15)}</TableCell>
                                        <TableCell align="left">
                                            <Switch checked={service.isActive} onChange={(e) => changeIsActiveHandler(e, service.id)} />
                                        </TableCell>
                                        <TableCell align="left"><span onClick={(e) => alert('Service id: ' + service.id)}>Click to Edit!</span></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
}