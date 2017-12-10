import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { AdministratorHomeCView } from "../components/home/administrator-home-cview";

export class AdministratorHomeRoute extends React.Component<RouteComponentProps<{}>> {
    public render(): JSX.Element {
        return <AdministratorHomeCView />;
    }
}
