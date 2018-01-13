import * as React from "react";
import * as Immutable from "immutable";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";

import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { ContainerStore } from "../../../../stores/containers/containers-store";
import { ContainersActionsCreators } from "../../../../actions/containers/containers-actions-creators";

import {
    AdministratorContainerAddContainersFormView
} from "../../components/collector-add-container/form/administrator-collector-add-containers-form-view";

import "./administrator-collector-add-container-container.css";

interface State {
    Status: Abstractions.ItemStatus;
    Items: Immutable.Map<number, ContainerDto>;
}

class AdministratorCollectorAddContainerContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [ContainerStore];
    }

    public static calculateState(state: State): State {
        const status = ContainerStore.Status;
        if (status === Abstractions.ItemStatus.Init) {
            setTimeout(() => ContainersActionsCreators.LoadRequired());
        }

        return {
            Items: ContainerStore.Items,
            Status: ContainerStore.Status
        };
    }

    public renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <div>Kraunama...</div>;
            }
            case Abstractions.ItemStatus.Loaded: {
                return <AdministratorContainerAddContainersFormView items={this.state.Items} />;
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>
                    Sąrašas tuščias.
                </div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Nepavyko užkrauti sąrašo.</div>;
            }
        }
    }

    public render(): JSX.Element {
        return <div className="administrator-collector-add-container-container">
            {this.renderStatuses()}
        </div>;
    }
}

export const AdministratorCollectorAddContainerContainer = Container.create(AdministratorCollectorAddContainerContainerClass);
