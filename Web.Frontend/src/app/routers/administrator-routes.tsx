import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { Layout } from "../modules/layout/layout";
import { AdministratorHomeRoute } from "../modules/administrator/routes/administrator-home-route";
import { AdministratorContainersRoute } from "../modules/administrator/routes/administrator-containers-route";
import { AdministratorContainerCreateRoute } from "../modules/administrator/routes/administrator-container-create-route";
import { AdministratorContainerViewRoute } from "../modules/administrator/routes/administrator-container-view-route";
import { AdministratorAddDeviceRoute } from "../modules/administrator/routes/administrator-device-add-route";

export class AdministratorRoutes extends React.Component {
    public render(): JSX.Element {
        return <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/administrator" component={AdministratorHomeRoute} exact />
                    <Route path="/administrator/containers" component={AdministratorContainersRoute} exact />
                    <Route path="/administrator/containers/:id" component={AdministratorContainerViewRoute} exact />
                    <Route path="/administrator/container/create" component={AdministratorContainerCreateRoute} exact />
                    <Route path="/administrator/container/device/create" component={AdministratorAddDeviceRoute} exact />
                </Switch>
            </Layout>
        </BrowserRouter>;
    }
}
