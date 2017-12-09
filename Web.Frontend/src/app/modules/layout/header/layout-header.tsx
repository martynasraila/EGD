import * as React from "react";

import { UserBox } from "./user-box/user-box";

import "./layout-header.css";

export class LayoutHeader extends React.Component<{}> {
    public render(): JSX.Element {
        return <div className="layout-header">
            <div className="home-button">
                <i className="fa fa-recycle"></i>
            </div>
            <div className="layout-navigation">layout navigation</div>
            <UserBox userTitle="Vardenis Pavardenis" />
        </div>;
    }
}
