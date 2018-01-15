import * as React from "react";
import { Container } from "flux/utils";
import { IdentityStore } from "../../../../../stores/identity/identity-store";
import { UserBox } from "../user-box";

interface State {
    UserTitle: string;
}

class UserBoxContainerClass extends React.Component<{}, State> {
    public static calculateState(state: State): State {
        return {
            UserTitle: IdentityStore.UserTitle || "-"
        };
    }

    public static getStores(): Container.StoresList {
        return [IdentityStore];
    }

    public render(): JSX.Element {
        return <UserBox userTitle={this.state.UserTitle} />;
    }
}

export const UserBoxContainer = Container.create(UserBoxContainerClass);
