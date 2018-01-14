import * as React from "react";
import { Container } from "flux/utils";
import { IdentityStore } from "../../../../stores/identity/identity-store";
import {
    AdministratorCollectorContainersContainer
} from "../../../administrator/containers/collector-view/administrator-collector-containers-container";
import { UserKind } from "../../../../stores/identity/identity-contracts";

import "./collector-containers-container.css";

interface State {
    UserId?: number;
}

export class CollectorContainersContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [IdentityStore];
    }

    public static calculateState(): State {
        return {
            UserId: IdentityStore.UserId
        };
    }

    public render(): JSX.Element | null {
        if (this.state.UserId == null) {
            return null;
        }

        return <div className="collector-containers-container">
            <AdministratorCollectorContainersContainer
                id={this.state.UserId}
                userKind={UserKind.Collector}
                className="collector-containers"
            />
        </div>;
    }
}

export const CollectorContainersContainer = Container.create(CollectorContainersContainerClass);
