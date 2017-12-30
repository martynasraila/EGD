import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { Layout } from "../modules/layout/layout";

export class CollectorRoutes extends React.Component {
    public render(): JSX.Element {
        return <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/collector" exact component={() => <div>Collector</div>} />
                </Switch>
            </Layout>
        </BrowserRouter>;
    }
}
