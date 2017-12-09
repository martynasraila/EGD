import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Layout } from "./modules/layout/layout";
import { AdministratorHomeRoute } from "./modules/administrator/routes/administrator-home-route";
import { AdministratorContainersRoute } from "./modules/administrator/routes/administrator-containers-route";
import { AdministratorContainerCreateRoute } from "./modules/administrator/routes/administrator-container-create-route";

export const Router = <BrowserRouter>
    <Layout>
        <Route path="/administrator" component={AdministratorHomeRoute} exact />
        <Route path="/administrator/containers" component={AdministratorContainersRoute} />
        <Route path="/administrator/containers/create" component={AdministratorContainerCreateRoute} />
        <Route path="/collector" component={() => <div>Collector</div>} />
    </Layout>
</BrowserRouter>;
