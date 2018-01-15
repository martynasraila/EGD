import * as React from "react";
import * as Immutable from "immutable";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";
import { SpinnerLoader } from "simplr-loaders";

import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { ContainersActionsCreators } from "../../../../actions/containers/containers-actions-creators";

import { TripContainersMapStore } from "../../../../stores/trips/trip-containers-map-store";
import { CollectorContainersMapStore } from "../../../../stores/collectors/collector-containers-map-store";

import { IdentityStore } from "../../../../stores/identity/identity-store";
import { CollectorContainerDto } from "../../../../stores/collectors/collectors-contracts";

import { ContainersMapStore } from "../../../../stores/containers/containers-map-store";
import { ItemsStatusResolver } from "../../../../helpers/flux-helpers";
import {
    ContainerTripAddContainersFormView
} from "../../components/trip-containers-add/add-container-form/collector-trip-container-add-form-view";

import "./administrator-collector-add-container-container.css";

interface State {
    Status: Abstractions.ItemStatus;
    Items?: Immutable.Map<string, ContainerDto>;
    StartPriority?: number;
}

interface Props {
    tripId: number;
}

class CollectorTripAddContainerContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [TripContainersMapStore, CollectorContainersMapStore, ContainersMapStore];
    }

    public static calculateState(state: State, props: Props): State {
        const tripContainers = TripContainersMapStore.get(props.tripId.toString());

        if (tripContainers.Value == null) {
            return {
                Status: tripContainers.Status
            };
        }

        const collectorContainers = CollectorContainersMapStore.get(IdentityStore.UserId!.toString());
        const status = collectorContainers.Status;
        const allContainers = collectorContainers.Value;

        if (status === Abstractions.ItemStatus.Init) {
            setTimeout(() => ContainersActionsCreators.LoadRequired());
        }

        let collectorContainersToLoad: CollectorContainerDto[] = [];

        if (status === Abstractions.ItemStatus.Loaded && allContainers != null && allContainers.size > 0) {
            collectorContainersToLoad = allContainers.filter(container =>
                container != null &&
                tripContainers.Value != null &&
                tripContainers.Value.findIndex(x => x != null && x.containerId === container.containerId) === -1
            ).toArray();
        }

        if (collectorContainersToLoad.length > 0) {
            const containersToLoad = collectorContainersToLoad.map(x => x.containerId.toString());
            const containerItems = ContainersMapStore.getAll(containersToLoad);

            const statuses = containerItems.map(x => x!.Status).toArray();
            const overAllStatus = ItemsStatusResolver(...statuses);

            if (overAllStatus === Abstractions.ItemStatus.Loaded) {
                return {
                    Items: containerItems.map(x => x!.Value as ContainerDto).toMap(),
                    Status: Abstractions.ItemStatus.Loaded,
                    StartPriority: allContainers!.size - collectorContainersToLoad.length
                };
            } else {
                return {
                    Status: overAllStatus
                };
            }

        } else {
            return {
                Status: Abstractions.ItemStatus.NoData
            };
        }
    }

    public renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <SpinnerLoader />;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Items != null) {
                    return <ContainerTripAddContainersFormView
                        items={this.state.Items}
                        tripId={this.props.tripId}
                        startPriority={this.state.StartPriority!}
                    />;
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

export const CollectorTripAddContainerContainer = Container
    .create(CollectorTripAddContainerContainerClass, { withProps: true });
