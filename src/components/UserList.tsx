import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

export default function UserList(): JSX.Element {
    const { users, loading, error } = useTypedSelector(state => state.user);
    const { getAllUsers } = useActions();

    useEffect(() => {
        getAllUsers()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return (<h1>{error} </h1>)
    }

    console.log("Users: ", users);
    console.log("Loading: ", loading);
    console.log("Error: ", error);

    return (
        <div>
            {
                users.map(user =>
                    <div key={user.id} > {user.id} - {user.name} - {user.email} </div>
                )
            }
        </div>
    )
};
