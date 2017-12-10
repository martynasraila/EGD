import { ReduceStore, ActionHandler } from "simplr-flux";
import { UserKind } from "./identity-contracts";
import { IdentityActions } from "../../actions/identity/identity-actions";

interface StoreState {
    UserId?: string;
    UserKind?: UserKind;
}

class IdentityStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(IdentityActions.UserLoggedIn, this.onUserLoggedIn);
        this.registerAction(IdentityActions.UserLoggedOut, this.cleanUpStore.bind(this));
    }

    private onUserLoggedIn: ActionHandler<IdentityActions.UserLoggedIn, StoreState> = (action, state) =>
        ({
            ...state,
            UserId: action.UserId,
            UserKind: action.UserKind
        })

    public getInitialState(): StoreState {
        return {
            // TODO: change.
            UserKind: UserKind.Administrator
        };
    }

    public get IsAuthenticated(): boolean {
        const state = this.getState();
        return Boolean(state.UserId) && Boolean(state.UserKind);
    }

    public get UserKind(): UserKind | undefined {
        return this.getState().UserKind;
    }
}

export const IdentityStore = new IdentityStoreClass();
