import * as React from "react";
import { LayoutMenu } from "../../../layout/menu/layout-menu";
import { LayoutMenuItem } from "../../../layout/menu/layout-menu-item";

export class AdministratorMenuCView extends React.Component {
    public render(): JSX.Element {
        return <LayoutMenu>
            <LayoutMenuItem iconClassName="fa fa-trash" to={{ pathname: "/administrator/containers" }}>
                Konteineriai
            </LayoutMenuItem>
            <LayoutMenuItem iconClassName="fa fa-car" to={{ pathname: "/administrator/collectors" }}>
                Vežėjai
            </LayoutMenuItem>
        </LayoutMenu>;
    }
}
