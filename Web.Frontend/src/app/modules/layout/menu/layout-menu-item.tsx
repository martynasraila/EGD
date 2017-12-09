import * as React from "react";
import { LocationDescriptorObject } from "history";
import { Link } from "react-router-dom";

import "./layout-menu-item.css";

interface Props {
    iconClassName: string;
    to: LocationDescriptorObject;
}

export class LayoutMenuItem extends React.PureComponent<Props> {
    public render(): JSX.Element {
        return <Link to={this.props.to} className="layout-menu-item">
            <i className={this.props.iconClassName}></i>
            {this.props.children}
        </Link>;
    }
}
