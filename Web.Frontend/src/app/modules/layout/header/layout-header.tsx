import * as React from "react";

import { HomeButton } from "./home-button/home-button";

import "./layout-header.css";
import { UserBoxContainer } from "./user-box/container/user-box-container";

export class LayoutHeader extends React.Component {
    public render(): JSX.Element {
        return <div className="layout-header">
            <HomeButton />
            <div className="layout-navigation">layout navigation</div>
            <UserBoxContainer />
        </div>;
    }
}
