import * as React from "react";
import { AdministratorCollectorViewContainer } from "../../containers/collector-view/administrator-collector-view-container";
import { AdministratorCollectorContainersContainer } from "../../containers/collector-view/administrator-collector-containers-container";

import "./administrator-collector-view.css";

interface Props {
    id: number;
}

export class AdministratorCollectorView extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="administrator-collector-view">
            <div className="administrator-collector-layout-view-container">
                <div className="administrator-collector-view-layout">
                    <AdministratorCollectorViewContainer id={this.props.id} />
                    <AdministratorCollectorContainersContainer id={this.props.id}/>
                </div>
            </div>
        </div>;
    }
}
