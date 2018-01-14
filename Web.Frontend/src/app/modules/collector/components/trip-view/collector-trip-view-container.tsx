import * as React from "react";
import { Container } from "flux/utils";
import { TripsMapStore } from "../../../../stores/trips/trips-map-store";
import { TripDto } from "../../../../stores/trips/trips-contracts";
import { Abstractions } from "simplr-flux";
import { CollectorTripView } from "./collector-trip-view";
import { SpinnerLoader } from "simplr-loaders";

interface Props {
    tripId: number;
}

interface State {
    Trip?: TripDto;
    Status: Abstractions.ItemStatus;
}

class CollectorTripViewContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [TripsMapStore];
    }

    public static calculateState(state: State, props: Props): State {
        const item = TripsMapStore.get(props.tripId.toString());
        return {
            Status: item.Status,
            Trip: item.Value
        };
    }

    public render(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <SpinnerLoader />;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Trip != null) {
                    return <CollectorTripView trip={this.state.Trip} />;
                }
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>Nepavyko rasti tokios kelionės</div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Nepavyko užkrauti kelionės.</div>;
            }
        }
    }
}

export const CollectorTripViewContainer = Container.create(CollectorTripViewContainerClass, { withProps: true });
