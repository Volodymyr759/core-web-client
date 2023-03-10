import { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ICandidate } from "../../../types/candidate";
import { OrderType } from "../../../types/common/orderType";
import AdminCandidateFilters from "./AdminCandidateFilters";
import AdminCandidateForm from "./AdminCandidateForm";
import AdminCandidateTable from "./AdminCandidateTable";


export default function AdminCandidatePage(): JSX.Element {
    const { candidateSearchResult, filters } = useTypedSelector(state => state.candidate);
    const { getCandidates } = useActions();
    const [candidate, setCandidate] = useState<ICandidate | null>(null);

    useEffect(() => {
        getCandidates(candidateSearchResult.pageSize, candidateSearchResult.currentPageNumber, filters, "FullName", OrderType.Ascending)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, candidateSearchResult.currentPageNumber]);

    const onCreateEdit = (candidate: null | ICandidate) => setCandidate(candidate);

    return (
        <>
            <PageHeader
                title="Candidates Management"
                text="Voluptatum deleniti atque."
            />
            <AdminCandidateFilters onAddNew={() => setCandidate({ id: 0, fullName: '', email: '', phone: '', notes: '', isDismissed: false, joinedAt: new Date(), vacancyId: 0 })} />
            <AdminCandidateTable onEdit={onCreateEdit} />
            {candidate && <AdminCandidateForm candidate={candidate} closeForm={() => setCandidate(null)} />}
        </>
    )
}