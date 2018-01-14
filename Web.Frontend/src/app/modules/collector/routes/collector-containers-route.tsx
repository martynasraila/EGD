import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { CollectorContainersContainer } from "../containers/collector-containers/collector-containers-container";

export class CollectorContainersRoute extends React.Component<RouteComponentProps<{}>> {
    public render(): JSX.Element {
        return <CollectorContainersContainer />;
    }
}
