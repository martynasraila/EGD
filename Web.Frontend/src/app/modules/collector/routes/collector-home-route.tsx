import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { StatisticsContainer } from "../../../containers/statistics/statistics-container";

export class CollectorHomeRoute extends React.Component<RouteComponentProps<{}>> {
    public render(): JSX.Element {
        return <StatisticsContainer />;
    }
}
