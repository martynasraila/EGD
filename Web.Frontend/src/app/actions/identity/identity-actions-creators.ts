import { Dispatcher } from "simplr-flux";
import { UserKind } from "../../stores/identity/identity-contracts";
import { IdentityActions } from "./identity-actions";

export function UserLoggedIn(userId: string, userKind: UserKind): void {
    Dispatcher.dispatch(new IdentityActions.UserLoggedIn(userId, userKind));
}

export function UserLoggedOut(): void {
    Dispatcher.dispatch(new IdentityActions.UserLoggedOut);
}
