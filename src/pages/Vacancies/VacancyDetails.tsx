import { useParams } from "react-router-dom";

export default function VacancyDetailes (): JSX.Element {
    const { vacancyId } = useParams();
    console.log('vacancyId: ', vacancyId);

    return (
        <div>
            VacancyDetailes
            <p>ID: {vacancyId}</p>
        </div>
    )
}
