import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AdministratorContainersContainer } from "../containers/containers/administrator-containers-container";

export class AdministratorContainersRoute extends React.Component<RouteComponentProps<{}>> {
    public render(): JSX.Element {
        return <AdministratorContainersContainer />;
    }
}
