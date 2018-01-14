import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { Layout } from "../modules/layout/layout";
import { CollectorHomeRoute } from "../modules/collector/routes/collector-home-route";
import { CollectorContainersRoute } from "../modules/collector/routes/collector-containers-route";
import { CollectorTripsRoute } from "../modules/collector/routes/collector-trips-route";
import { CollectorTripViewRoute } from "../modules/collector/routes/collector-trip-route";
import { CollectorTripAddContainersRoute } from "../modules/collector/routes/collector-trip-add-containers-route";

export class CollectorRoutes extends React.Component {
    public render(): JSX.Element {
        return <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" component={CollectorHomeRoute} exact />
                    <Route path="/collector" exact component={CollectorHomeRoute} />
                    <Route path="/collector/containers" exact component={CollectorContainersRoute} />
                    <Route path="/collector/trips" exact component={CollectorTripsRoute} />
                    <Route path="/collector/trips/:id" exact component={CollectorTripViewRoute} />
                    <Route path="/collector/trips/:id/add-containers" exact component={CollectorTripAddContainersRoute} />
                </Switch>
            </Layout>
        </BrowserRouter>;
    }
}
