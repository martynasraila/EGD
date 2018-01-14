import * as React from "react";
import * as Immutable from "immutable";
import { Container } from "flux/utils";
import { SpinnerLoader } from "simplr-loaders";
import { Link } from "react-router-dom";
import { Submit } from "@simplr/react-forms-dom";

import { Abstractions } from "simplr-flux";

import { TripsMapStore } from "../../../../stores/trips/trips-map-store";
import { CollectorTripsMapStore } from "../../../../stores/collectors/collector-trips-map-store";
import { TripDto } from "../../../../stores/trips/trips-contracts";
import { IdentityStore } from "../../../../stores/identity/identity-store";
import { ItemsStatusResolver } from "../../../../helpers/flux-helpers";
import { CollectorTripsFormCView, FORM_ID } from "../../components/trips/collector-trips-cview";

import "./collector-trips-container.css";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";

interface State {
    Status: Abstractions.ItemStatus;
    Items?: Immutable.Map<string, TripDto>;
}

class CollectorTripsContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [IdentityStore, TripsMapStore, CollectorTripsMapStore];
    }

    public static calculateState(state: State): State {
        const collectorId = IdentityStore.UserId;

        if (collectorId == null) {
            return {
                Status: Abstractions.ItemStatus.NoData
            };
        }

        const item = CollectorTripsMapStore.get(collectorId.toString());

        if (item.Value == null) {
            return {
                Items: undefined,
                Status: item.Status
            };
        }

        const tripsList = item.Value.map<string>(x => x!.tripId.toString()).toArray();

        const requestedTrips = TripsMapStore.getAll(tripsList);

        const itemsStatus = ItemsStatusResolver(...requestedTrips.map(x => x!.Status).toArray());

        if (itemsStatus !== Abstractions.ItemStatus.Loaded) {
            return {
                Status: itemsStatus
            };
        }

        const itemsMap = requestedTrips.map(x => x!.Value as TripDto).toMap();

        return {
            Items: itemsMap,
            Status: Abstractions.ItemStatus.Loaded
        };
    }

    private onCopyTrip: FormOnSubmitCallback = async (event, store) => {
        const tripIdString: string = store.ToObject().tripId;

        if (tripIdString == null || tripIdString != null && tripIdString.length === 0) {
            return;
        }

        const tripId = Number(tripIdString);

        // TODO: implement trip copy.
        console.info(tripId);
    }

    private renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <SpinnerLoader />;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Items) {
                    return <CollectorTripsFormCView items={this.state.Items} onSubmit={this.onCopyTrip} />;
                }
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>Kelionių nėra.</div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Nepavyko užkrauti kelionių sąrašo.</div>;
            }

        }
    }

    public render(): JSX.Element {
        return <div className="collector-trips-container">
            <div className="controls-section">
                <Link className="btn btn-light" to="/collector/trips/create">Sukurti</Link>
                <Submit formId={FORM_ID} className="btn btn-light">Kopijuoti</Submit>
            </div>
            {this.renderStatuses()}
        </div>;
    }
}

export const CollectorTripsContainer = Container.create(CollectorTripsContainerClass);