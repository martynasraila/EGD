import { Dispatcher } from "simplr-flux";
import { UserKind } from "../../stores/identity/identity-contracts";
import { IdentityActions } from "./identity-actions";

export class IdentityActionsCreators {
    public static UserLoggedIn(userId: string, userKind: UserKind): void {
        Dispatcher.dispatch(new IdentityActions.UserLoggedIn(userId, userKind));
    }

    public static UserLoggedOut(): void {
        Dispatcher.dispatch(new IdentityActions.UserLoggedOut);
    }

    // public static AuthenticationRequired(userName: string, password: string): void {

    // }

    // public static AuthenticationFailed(): void {

    // }
}
