import PageHeader from "../../components/PageHeader/PageHeader";
import RegisterForm from "./RegisterForm";

export default function RegisterPage(): JSX.Element {
    return (
        <>
            <PageHeader
                title="Sign Up."
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '30px 0' }}>
                <RegisterForm />
            </div>
        </>
    )
}
