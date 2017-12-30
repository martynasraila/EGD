import * as React from "react";
import { RouteComponentProps } from "react-router";
import { AdministratorCollectorCreateCView } from "../components/collector-create/administrator-collector-create-cview";

export class AdministratorCollectorCreateRoute extends React.Component<RouteComponentProps<{}>> {
    public render(): JSX.Element {
        return <AdministratorCollectorCreateCView history={this.props.history} />;
    }
}
