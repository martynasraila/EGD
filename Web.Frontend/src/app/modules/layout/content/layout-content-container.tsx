import * as React from "react";
import { LayoutMenu } from "../menu/layout-menu";

import "./layout-content-container.css";

export class LayoutContentContainer extends React.Component<{}> {
    public render(): JSX.Element {
        return <div className="layout-content-container">
            <LayoutMenu />
            {this.props.children}
        </div>;
    }
}
