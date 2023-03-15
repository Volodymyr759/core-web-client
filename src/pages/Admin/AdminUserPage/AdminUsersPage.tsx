import { useEffect } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import PageHeader from '../../../components/PageHeader/PageHeader';
import AdminUserFilters from './AdminUserFilters';
import AdminUserTable from './AdminUserTable';

export default function AdminUsersPage(): JSX.Element {
    const { userSearchResult, filters } = useTypedSelector(state => state.user);
    const { getUsers } = useActions();
    
    useEffect(() => {
        getUsers(userSearchResult.pageSize, userSearchResult.currentPageNumber, filters)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, userSearchResult.currentPageNumber]);
    
    return (
        <>
            <PageHeader title="Users Management" />
            <AdminUserFilters />
            <AdminUserTable />
        </>
    );
};
