import * as React from "react";
import { MenuResolverContainer } from "../menu/menu-resolver/menu-resolver-container";

import "./layout-content-container.css";

export class LayoutContentContainer extends React.Component {
    public render(): JSX.Element {
        return <div className="layout-content-container">
            <MenuResolverContainer />
            {this.props.children}
        </div>;
    }
}
