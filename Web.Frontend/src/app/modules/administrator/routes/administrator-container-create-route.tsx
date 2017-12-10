import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AdministratorContainerCreateCView } from "../components/container-create/administrator-container-create-cview";

export class AdministratorContainerCreateRoute extends React.Component<RouteComponentProps<{}>> {
    public render(): JSX.Element {
        return <AdministratorContainerCreateCView history={this.props.history}/>;
    }
}
