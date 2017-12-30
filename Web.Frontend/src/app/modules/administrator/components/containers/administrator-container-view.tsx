import * as React from "react";
import { AdministratorContainerViewContainer } from "../../containers/container-view/administrator-container-view-container";
import { AdministratorDeviceViewContainer } from "../../containers/devices/administrator-device-view-container";

import "./administrator-container-view.css";

interface Props {
    id: number;
}

export class AdministratorContainerView extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="administrator-container-view">
            <div className="administrator-container-view-layout-container">
                <div className="administrator-container-view-layout">
                    <AdministratorContainerViewContainer id={this.props.id} />
                    <AdministratorDeviceViewContainer containerId={this.props.id} />
                </div>
            </div>
        </div>;
    }
}
