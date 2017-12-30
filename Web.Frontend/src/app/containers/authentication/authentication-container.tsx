import * as React from "react";
import * as FluxUtils from "flux/utils";
import { IdentityStore } from "../../stores/identity/identity-store";
import { AdministratorRoutes } from "../../routers/administrator-routes";
import { UserKind } from "../../stores/identity/identity-contracts";
import { CollectorRoutes } from "../../routers/collector-routes";
import { Login } from "../../modules/login/login";

interface State {
    IsAuthenticated: boolean;
    UserKind?: UserKind;
}

class AuthenticationContainerClass extends React.Component<{}, State> {
    public static getStores(): FluxUtils.Container.StoresList {
        return [IdentityStore];
    }

    public static calculateState(state: State): State {
        return {
            IsAuthenticated: IdentityStore.IsAuthenticated,
            UserKind: IdentityStore.getState().UserKind
        };
    }

    public render(): JSX.Element {
        switch (this.state.UserKind) {
            case UserKind.Administrator: {
                return <AdministratorRoutes />;
            }
            case UserKind.Collector: {
                return <CollectorRoutes />;
            }
            default: {
                return <Login />;
            }
        }
    }
}

export const AuthenticationContainer = FluxUtils.Container.create(AuthenticationContainerClass);
