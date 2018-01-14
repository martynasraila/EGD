import * as React from "react";

import "./layout-menu.css";

export class LayoutMenu extends React.Component {
    public render(): JSX.Element {
        return <div className="layout-menu">
            {this.props.children}
        </div>;
    }
}
