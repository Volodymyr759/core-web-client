import PageHeader from "../../components/PageHeader/PageHeader";
import VacanciesFilters from "./VacanciesFilters";
import VacanciesList from "./VacanciesList";

export default function VacanciesPage(): JSX.Element {

    return (
        <>
            <PageHeader
                title="OUR VACANCIES"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate."
            />
            <VacanciesFilters />
            <VacanciesList />
        </>
    )
}
