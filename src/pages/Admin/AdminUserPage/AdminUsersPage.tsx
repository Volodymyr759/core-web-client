import { useEffect, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IUser } from '../../../types/user';
import PageHeader from '../../../components/PageHeader/PageHeader';
import AdminUserFilters from './AdminUserFilters';
import AdminUserForm from './AdminUserForm';
import AdminUserTable from './AdminUserTable';

export default function AdminUsersPage(): JSX.Element {
    const { userSearchResult, filters } = useTypedSelector(state => state.user);
    const { getUsers } = useActions();
    const [user, setUser] = useState<IUser | null>(null);
    
    useEffect(() => {
        getUsers(userSearchResult.pageSize, userSearchResult.currentPageNumber, filters)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, userSearchResult.currentPageNumber]);

    const onCreateEdit = (user: null | IUser) => setUser(user);
    
    return (
        <>
            {/* <UserList /> */}
            <PageHeader title="Users Management" />
            <AdminUserFilters />
            <AdminUserTable onEdit={onCreateEdit} />
            {user && <AdminUserForm user={user} closeForm={() => setUser(null)} />}
        </>
    );
};
