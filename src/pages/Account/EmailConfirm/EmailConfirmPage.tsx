import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { confirmEmailAxios } from "../../../api/auth";
import ErrorMessage from "../../../components/Messages/ErrorMessage";
import SuccessMessage from "../../../components/Messages/SuccessMessage";
import { MessageAppearance } from "../../../components/Messages/types";
import PageHeader from "../../../components/PageHeader/PageHeader";
import Spinner from "../../../components/Spinner/Spinner";

export default function EmailConfirmPage(): JSX.Element {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);

    const tryToConfirmEmailByUrlParams = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('params.code ', encodeURIComponent(params.code))
            await confirmEmailAxios(params.code, params.email)
        } catch (e) {
            setError(e.message || 'Unknown server error.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        tryToConfirmEmailByUrlParams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container maxWidth="lg" className='layout-container' >
            <PageHeader
                title="Email Confirmation"
                text="Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem."
            />
            {loading ? <Spinner />
                :
                error ? <ErrorMessage appearance={MessageAppearance.LARGE}>{error}</ErrorMessage>
                    :
                    <SuccessMessage appearance={MessageAppearance.LARGE}>
                        Email has been successfully verified. Please Sign In to continue.
                    </SuccessMessage>
            }
        </Container>
    )
}