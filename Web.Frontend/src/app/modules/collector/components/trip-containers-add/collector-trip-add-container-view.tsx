import * as React from "react";

import "./collector-trip-add-container-view.css";
import { CollectorTripAddContainerContainer } from "../../containers/trip-container-add/collector-trip-container-add-container";

interface Props {
    id: number;
}

export class CollectorTripAddContainerView extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="collector-trip-add-container-view">
            <div className="collector-trip-add-container-layout-view-container">
                <div className="collector-trip-add-container-view-layout">
                    <CollectorTripAddContainerContainer tripId={this.props.id} />
                </div>
            </div>
        </div>;
    }
}
