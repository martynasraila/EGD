import * as React from "react";
import { LayoutMenuItem } from "./layout-menu-item";

import "./layout-menu.css";

export class LayoutMenu extends React.Component<{}> {
    public render(): JSX.Element {
        return <div className="layout-menu">
            <LayoutMenuItem iconClassName="fa fa-trash" to={{ pathname: "/administrator/containers" }}>
                Konteineriai
            </LayoutMenuItem>
            <LayoutMenuItem iconClassName="fa fa-car" to={{ pathname: "/administrator/collectors" }}>
                Vežėjai
            </LayoutMenuItem>
        </div>;
    }
}
