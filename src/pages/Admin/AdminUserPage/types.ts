import { IUser } from "../../../types/user";

export interface AdminUserTableProps {
    onEdit: (user: IUser) => void;
}

export interface AdminUserFormProps {
    user: IUser;
    closeForm: () => void;
}