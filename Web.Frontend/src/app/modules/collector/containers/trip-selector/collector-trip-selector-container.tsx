import * as React from "react";
import * as Immutable from "immutable";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";
import { SpinnerLoader } from "simplr-loaders";

import { TripContainersMapStore } from "../../../../stores/trips/trip-containers-map-store";
import { ContainersMapStore } from "../../../../stores/containers/containers-map-store";
import { ItemsStatusResolver } from "../../../../helpers/flux-helpers";
import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { CollectorTripSelectorCView } from "../../components/trip-view/trip-selector/collector-trip-selector-cview";
import { LabeledContainer } from "../../../../components/labeled-container/labeled-container";

interface Props {
    tripId: number;
    disabled: boolean;
}

export interface TripContainerExtendedDto extends ContainerDto {
    containerPriority: number;
    tripId: number;
}

interface State {
    Status: Abstractions.ItemStatus;
    Items?: Immutable.Map<string, TripContainerExtendedDto>;
}

class CollectorTripSelectorContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [TripContainersMapStore, ContainersMapStore];
    }

    public static calculateState(state: State, props: Props): State {
        const item = TripContainersMapStore.get(props.tripId.toString());

        if (item.Value == null) {
            return {
                Items: undefined,
                Status: item.Status
            };
        }

        if (item.Value.size === 0) {
            return {
                Status: Abstractions.ItemStatus.NoData
            };
        }

        // x should be defined.
        const containersList = item.Value.map<string>(x => x!.containerId.toString()).toArray();

        const requestedContainers = ContainersMapStore.getAll(containersList);

        const itemsStatus = ItemsStatusResolver(...requestedContainers.map(x => x!.Status).toArray());

        if (itemsStatus !== Abstractions.ItemStatus.Loaded) {
            return {
                Status: itemsStatus
            };
        }

        const itemsMap = requestedContainers
            .map(x => {
                const tripContainerIndex = item.Value!.findIndex(y => y!.containerId === x!.Value!.id);
                const tripContainer = item.Value!.get(tripContainerIndex);

                return {
                    ...x!.Value,
                    containerPriority: tripContainer.containerPriority,
                    tripId: props.tripId
                } as TripContainerExtendedDto;
            })
            .toMap();

        return {
            Items: itemsMap,
            Status: Abstractions.ItemStatus.Loaded
        };
    }

    private renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <SpinnerLoader />;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Items != null) {
                    return <CollectorTripSelectorCView
                        tripId={this.props.tripId}
                        items={this.state.Items}
                        disabled={this.props.disabled}
                    />;
                }
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>Kelionė neturi priskirtų konteinerių.</div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Nepavyko užkrauti kelionės konteinerių sąrašo.</div>;
            }
        }
    }

    public render(): JSX.Element {
        return <LabeledContainer title="Maršrutas" className="collector-trip-selector-container">
            {this.renderStatuses()}
        </LabeledContainer>;
    }
}

export const CollectorTripSelectorContainer = Container.create(CollectorTripSelectorContainerClass, { withProps: true });
