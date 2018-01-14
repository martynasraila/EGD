import * as React from "react";
import { LayoutMenu } from "../../../layout/menu/layout-menu";
import { LayoutMenuItem } from "../../../layout/menu/layout-menu-item";

export class CollectorMenuCView extends React.Component {
    public render(): JSX.Element {
        return <LayoutMenu>
            <LayoutMenuItem iconClassName="fa fa-trash" to={{ pathname: "/collector/containers" }}>
                Konteineriai
            </LayoutMenuItem>
            <LayoutMenuItem iconClassName="fa fa-map-marker" to={{ pathname: "/collector/trips" }}>
                Kelionės
            </LayoutMenuItem>
        </LayoutMenu>;
    }
}
