import PageHeader from "../../components/PageHeader/PageHeader";
import ContactContent from "./ContactContent";

export default function ContactPage(): JSX.Element {
    return (
        <>
            <PageHeader
                title="CONTACT US"
                text="Lorem ipsum dolor..."
            />
            <ContactContent />
        </>
    )
}
