import {useParams} from "react-router-dom";

const VacancyDetailes = () => {
    let {id} = useParams();
    console.log('id: ', id);

    return (
        <div>
            VacancyDetailes
            <p>ID: {id}</p>
        </div>
    )
}

export default VacancyDetailes;