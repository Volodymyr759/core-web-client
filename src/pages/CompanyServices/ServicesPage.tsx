import PageHeader from "../../components/PageHeader/PageHeader";
import ServicesList from "./ServicesList";

export default function ServicesPage(): JSX.Element {

    return (
        <>
            <PageHeader
                title="OUR SERVICES"
                text="Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi."
            />
            <ServicesList />
        </>
    )
}
