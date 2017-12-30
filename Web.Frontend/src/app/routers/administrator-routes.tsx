import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { Layout } from "../modules/layout/layout";
import { AdministratorHomeRoute } from "../modules/administrator/routes/administrator-home-route";
import { AdministratorContainersRoute } from "../modules/administrator/routes/administrator-containers-route";
import { AdministratorContainerCreateRoute } from "../modules/administrator/routes/administrator-container-create-route";
import { AdministratorContainerViewRoute } from "../modules/administrator/routes/administrator-container-view-route";
import { AdministratorAddDeviceRoute } from "../modules/administrator/routes/administrator-device-add-route";
import { AdministratorCollectorsRoute } from "../modules/administrator/routes/administrator-collectors-route";

export class AdministratorRoutes extends React.Component {
    public render(): JSX.Element {
        return <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" component={AdministratorHomeRoute} exact />
                    <Route path="/administrator" component={AdministratorHomeRoute} exact />
                    <Route path="/administrator/containers" component={AdministratorContainersRoute} exact />
                    <Route path="/administrator/containers/:id" component={AdministratorContainerViewRoute} exact />
                    <Route path="/administrator/container/create" component={AdministratorContainerCreateRoute} exact />
                    <Route path="/administrator/container/device/create" component={AdministratorAddDeviceRoute} exact />
                    <Route path="/administrator/collectors" component={AdministratorCollectorsRoute} exact />
                </Switch>
            </Layout>
        </BrowserRouter>;
    }
}
