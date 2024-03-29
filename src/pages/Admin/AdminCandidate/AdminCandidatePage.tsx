import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ICandidate } from "../../../types/candidate";
import AdminCandidateFilters from "./AdminCandidateFilters";
import AdminCandidateForm from "./AdminCandidateForm";
import AdminCandidateTable from "./AdminCandidateTable";
import { VacancyStatus } from "../../../types/vacancy";
import { OrderType } from "../../../types/common/orderType";

export default function AdminCandidatePage(): JSX.Element {
    const { candidateSearchResult, filters, sortField } = useTypedSelector(state => state.candidate);
    const { vacancySearchResult, filters: vacanciesFilter } = useTypedSelector(state => state.vacancy);
    const { getVacancies, getCandidates } = useActions();
    const [candidate, setCandidate] = useState<ICandidate | null>(null);

    useEffect(() => {
        getVacancies(0, 1, "", VacancyStatus.All, vacanciesFilter.officeId, "Title", OrderType.Ascending);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getCandidates(candidateSearchResult.pageSize, candidateSearchResult.currentPageNumber, filters, sortField, candidateSearchResult.order)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, candidateSearchResult.currentPageNumber, sortField, candidateSearchResult.order]);

    const onCreateEdit = (candidate: null | ICandidate) => setCandidate(candidate);

    return (
        <>
            <AdminCandidateFilters onAddNew={() => setCandidate({ id: 0, fullName: '', email: '', phone: '', notes: '', isDismissed: false, joinedAt: new Date(), vacancyId: vacancySearchResult.itemList[0].id })} />
            <AdminCandidateTable onEdit={onCreateEdit} />
            {candidate && <AdminCandidateForm candidate={candidate} closeForm={() => setCandidate(null)} />}
        </>
    )
}