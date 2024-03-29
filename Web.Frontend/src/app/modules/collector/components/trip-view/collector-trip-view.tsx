import * as React from "react";
import * as classNames from "classnames";
import * as url from "url";
import { Link } from "react-router-dom";

import { TripDto } from "../../../../stores/trips/trips-contracts";

import { CollectorTripBasicInfoView } from "./basic-info/collector-trip-basic-info-view";
import { CollectorTripSelectorContainer } from "../../containers/trip-selector/collector-trip-selector-container";
import { ActionEmitter } from "../../../../helpers/action-emitter";
import { SaveTripPrioritiesAction } from "./trip-selector/collector-trip-selector-cview";
import { Configuration } from "../../../../configuration";

import { TripsMapStore } from "../../../../stores/trips/trips-map-store";

import "./collector-trip-view.css";

interface Props {
    trip: TripDto;
}

export class CollectorTripView extends React.Component<Props> {
    private onAddContainersClick: React.MouseEventHandler<HTMLElement> = event => {
        if (this.props.trip.endDate != null && this.props.trip.endDate.length > 0) {
            event.preventDefault();
        }
    }

    private async startTrip(): Promise<void> {
        const path = url.resolve(Configuration.Api.Path, "/Api/Trips");

        try {
            await window.fetch(path, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any,
                body: JSON.stringify({
                    ...this.props.trip,
                    startDate: new Date().toISOString()
                })
            });

            TripsMapStore.InvalidateCache(this.props.trip.id.toString());
        } catch (error) {
            console.error(error);
            alert("Nepavyko pradėti kelionės. Pabandykite vėliau.");
        }
    }

    private async endTrip(): Promise<void> {
        const path = url.resolve(Configuration.Api.Path, "/Api/Trips");

        try {
            await window.fetch(path, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any,
                body: JSON.stringify({
                    ...this.props.trip,
                    endDate: new Date().toISOString()
                })
            });

            TripsMapStore.InvalidateCache(this.props.trip.id.toString());
        } catch (error) {
            console.error(error);
            alert("Nepavyko pradėti kelionės. Pabandykite vėliau.");
        }
    }

    private onStartClick: React.MouseEventHandler<HTMLElement> = () => {
        this.startTrip();
    }

    private onEndClick: React.MouseEventHandler<HTMLElement> = () => {
        this.endTrip();
    }

    private onSaveClick: React.MouseEventHandler<HTMLElement> = () => {
        ActionEmitter.emit(new SaveTripPrioritiesAction);
    }

    public render(): JSX.Element {
        return <div className="collector-trip-view">
            <div className="controls-section">
                <div>
                    <button
                        className="btn btn-light"
                        disabled={this.props.trip.startDate != null && this.props.trip.startDate.length > 0}
                        onClick={this.onStartClick}
                    >
                        Pradėti
                    </button>
                    <button
                        className="btn btn-light"
                        disabled={
                            this.props.trip.startDate == null ||
                            this.props.trip.startDate.length === 0 ||
                            this.props.trip.endDate != null &&
                            this.props.trip.endDate.length > 0
                        }
                        onClick={this.onEndClick}
                    >
                        Užbaigti
                    </button>
                </div>
                <div>
                    <Link
                        className={classNames(
                            "btn btn-light",
                            { "disabled": this.props.trip.endDate != null && this.props.trip.endDate.length > 0 }
                        )}
                        to={`/collector/trips/${this.props.trip.id}/add-containers`}
                        onClick={this.onAddContainersClick}
                    >
                        Pridėti konteinerių
                    </Link>
                    <button
                        className="btn btn-light"
                        onClick={this.onSaveClick}
                        disabled={this.props.trip.endDate != null && this.props.trip.endDate.length > 0}
                    >
                        Išsaugoti
                    </button>
                </div>
            </div>
            <div className="collector-trip-layout-view-container">
                <div className="collector-trip-view-layout">
                    <CollectorTripBasicInfoView trip={this.props.trip} />
                    <CollectorTripSelectorContainer
                        tripId={this.props.trip.id}
                        disabled={this.props.trip.endDate != null && this.props.trip.endDate.length > 0}
                    />
                </div>
            </div>
        </div>;
    }
}
