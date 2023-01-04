import * as UserActionCreators from "./user";
import * as AuthActionCreators from "./auth";

export const ActionCreators = {
    ...AuthActionCreators,
    ...UserActionCreators
}