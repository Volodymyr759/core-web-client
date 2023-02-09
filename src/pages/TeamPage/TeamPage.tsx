import { PageHeader } from "../../components/PageHeader/PageHeader";
import EmployeesList from "./EmployeesList";

export default function TeamPage() {
    return (
        <>
            <PageHeader
                title="OUR TEAM"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas."
            />
            <EmployeesList />
        </>
    )
}