import { PageHeader } from "../../components/PageHeader/PageHeader";
import VacanciesList from "./VacanciesList";

const VacanciesPage = () => {

    return (
        <>
            <PageHeader
                title="OUR VACANCIES"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate."
            />
            <VacanciesList />
        </>
    )
}

export default VacanciesPage;