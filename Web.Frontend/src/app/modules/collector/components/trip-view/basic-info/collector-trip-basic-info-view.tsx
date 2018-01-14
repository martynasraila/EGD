import * as React from "react";
import { TripDto } from "../../../../../stores/trips/trips-contracts";
import { LabeledContainer } from "../../../../../components/labeled-container/labeled-container";

import "./collector-trip-basic-info-view.css";

interface Props {
    trip: TripDto;
}

export class CollectorTripBasicInfoView extends React.Component<Props> {
    public render(): JSX.Element {
        return <LabeledContainer title="Bendroji informacija" className="collector-trip-basic-info-view">
            <div>
                <div className="title">Sukūrimo data</div>
                <div>{this.props.trip.dateCreated}</div>
            </div>
            <div>
                <div className="title">Pradžios data</div>
                <div>{this.props.trip.startDate ? this.props.trip.startDate : "-"}</div>
            </div>
            <div>
                <div className="title">Pabaigos data</div>
                <div>{this.props.trip.endDate ? this.props.trip.endDate : "-"}</div>
            </div>
        </LabeledContainer>;
    }
}
