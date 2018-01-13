import { Dispatcher } from "simplr-flux";
import { IdentityActions } from "./identity-actions";
import { IdentityDto } from "../../stores/identity/identity-store";

export class IdentityActionsCreators {
    public static UserLoggedIn(identity: IdentityDto): void {
        Dispatcher.dispatch(new IdentityActions.UserLoggedIn(identity));
    }

    public static UserLoggedOut(): void {
        Dispatcher.dispatch(new IdentityActions.UserLoggedOut);
    }

    public static AuthenticationRequired(userName: string, password: string): void {
        Dispatcher.dispatch(new IdentityActions.AuthenticationRequired(userName, password));
    }
}
