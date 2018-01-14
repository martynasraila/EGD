import * as React from "react";
import * as Immutable from "immutable";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";
import { SpinnerLoader } from "simplr-loaders";

import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { ContainerStore } from "../../../../stores/containers/containers-store";
import { ContainersActionsCreators } from "../../../../actions/containers/containers-actions-creators";

import {
    AdministratorContainerAddContainersFormView
} from "../../components/collector-add-container/form/administrator-collector-add-containers-form-view";

import { CollectorContainersMapStore } from "../../../../stores/collectors/collector-containers-map-store";

import "./administrator-collector-add-container-container.css";

interface State {
    Status: Abstractions.ItemStatus;
    Items?: Immutable.Map<number, ContainerDto>;
}

interface Props {
    collectorId: number;
}

class AdministratorCollectorAddContainerContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [CollectorContainersMapStore, ContainerStore];
    }

    public static calculateState(state: State, props: Props): State {
        const collectorContainers = CollectorContainersMapStore.get(props.collectorId.toString());

        if (collectorContainers.Value == null) {
            return {
                Items: undefined,
                Status: collectorContainers.Status
            };
        }

        const status = ContainerStore.Status;
        const allContainers = ContainerStore.Items;

        if (status === Abstractions.ItemStatus.Init) {
            setTimeout(() => ContainersActionsCreators.LoadRequired());
        }

        let items;

        if (status === Abstractions.ItemStatus.Loaded && allContainers.size > 0) {
            items = allContainers.filter(container =>
                container != null &&
                    collectorContainers.Value != null &&
                    collectorContainers.Value.findIndex(x => x != null && x.containerId === container.id) === -1
            ).toMap();
        }

        return {
            Items: items,
            Status: ContainerStore.Status
        };
    }

    public renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <SpinnerLoader />;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Items != null) {
                    return <AdministratorContainerAddContainersFormView collectorId={this.props.collectorId} items={this.state.Items} />;
                }
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

export const AdministratorCollectorAddContainerContainer = Container
    .create(AdministratorCollectorAddContainerContainerClass, { withProps: true });
