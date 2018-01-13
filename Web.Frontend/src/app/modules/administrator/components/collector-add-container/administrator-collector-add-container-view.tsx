import * as React from "react";
import {
    AdministratorCollectorAddContainerContainer
} from "../../containers/collector-add-container-container/administrator-collector-add-container-container";

import "./administrator-collector-add-container-view.css";

interface Props {
    id: number;
}

export class AdministratorCollectorAddContainerView extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="administrator-collector-add-container-view">
            <div className="administrator-collector-layout-view-container">
                <div className="administrator-collector-view-layout">
                    <AdministratorCollectorAddContainerContainer />
                </div>
            </div>
        </div>;
    }
}
