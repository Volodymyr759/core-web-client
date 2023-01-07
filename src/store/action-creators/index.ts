import * as AuthActionCreators from "./auth";
import * as EmployeeActionCreators from "./employee";
import * as UserActionCreators from "./user";

export const ActionCreators = {
    ...AuthActionCreators,
    ...EmployeeActionCreators,
    ...UserActionCreators
}