import { ReduceStore, ActionHandler } from "simplr-flux";
import { UserKind } from "./identity-contracts";
import { IdentityActions } from "../../actions/identity/identity-actions";

interface StoreState {
    UserId?: number;
    UserKind?: UserKind;
    UserTitle?: string;
    UserName?: string;
}

export interface IdentityDto {
    userKind: UserKind;
    id: number;
    userName?: string;
    passwordHash?: string;
    title?: string;
}

const IDENTITY_ITEM_KEY: string = "Identity";

class IdentityStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(IdentityActions.UserLoggedIn, this.onUserLoggedIn);
        this.registerAction(IdentityActions.UserLoggedOut, this.onUserLoggedOut);
    }

    private onUserLoggedOut: ActionHandler<IdentityActions.UserLoggedOut, StoreState> = (action, state) => {
        localStorage.removeItem(IDENTITY_ITEM_KEY);
        return this.getInitialState();
    }

    private onUserLoggedIn: ActionHandler<IdentityActions.UserLoggedIn, StoreState> = (action, state) => {
        const newState = {
            UserKind: action.Identity.userKind,
            UserId: action.Identity.id,
            UserTitle: action.Identity.title,
            UserName: action.Identity.userName
        };

        localStorage.setItem(IDENTITY_ITEM_KEY, JSON.stringify(newState));

        return newState;
    }

    public getInitialState(): StoreState {
        try {
            const identity = localStorage.getItem(IDENTITY_ITEM_KEY);

            if (identity != null) {
                return JSON.parse(identity);
            }
        } catch (error) {
            console.error(error);
        }

        return {};
    }

    public get IsAuthenticated(): boolean {
        const state = this.getState();
        return Boolean(state.UserId) && Boolean(state.UserKind);
    }

    public get UserKind(): UserKind | undefined {
        return this.getState().UserKind;
    }

    public get UserId(): number | undefined {
        return this.getState().UserId;
    }

    public get UserTitle(): string | undefined {
        return this.getState().UserTitle;
    }
}

export const IdentityStore = new IdentityStoreClass();
