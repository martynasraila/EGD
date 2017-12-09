import * as React from "react";
import { LayoutHeader } from "./header/layout-header";
import { LayoutContentContainer } from "./content/layout-content-container";

import "./layout.css";

export class Layout extends React.Component<{}> {
    public render(): JSX.Element {
        return <div className="layout-container">
            <LayoutHeader />
            <LayoutContentContainer>
                {this.props.children}
            </LayoutContentContainer>
        </div>;
    }
}
