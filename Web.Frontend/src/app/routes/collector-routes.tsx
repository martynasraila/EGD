import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { Layout } from "../modules/layout/layout";

export const CollectorRoutes =
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route path="/collector" exact component={() => <div>Collector</div>} />
            </Switch>
        </Layout>
    </BrowserRouter>;
