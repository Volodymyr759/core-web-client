import * as AuthActionCreators from "./auth";
import * as CompanyServiceActionCreators from "./companyService";
import * as EmployeeActionCreators from "./employee";
import * as UserActionCreators from "./user";
import * as VacancyActionCreators from "./vacancy";

export const ActionCreators = {
    ...AuthActionCreators,
    ...CompanyServiceActionCreators,
    ...EmployeeActionCreators,
    ...UserActionCreators,
    ...VacancyActionCreators
}