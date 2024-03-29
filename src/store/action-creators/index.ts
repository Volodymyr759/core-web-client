import * as AuthActionCreators from "./auth";
import * as CandidateActionCreators from "./candidate";
import * as CompanyServiceActionCreators from "./companyService";
import * as CountryActionCreators from "./country";
import * as EmployeeActionCreators from "./employee";
import * as FavoriteVacancyActionCreators from "./favoriteVacancy";
import * as OfficeActionCreators from "./office";
import * as UserActionCreators from "./user";
import * as VacancyActionCreators from "./vacancy";

export const ActionCreators = {
    ...AuthActionCreators,
    ...CandidateActionCreators,
    ...CompanyServiceActionCreators,
    ...CountryActionCreators,
    ...EmployeeActionCreators,
    ...FavoriteVacancyActionCreators,
    ...OfficeActionCreators,
    ...UserActionCreators,
    ...VacancyActionCreators
}