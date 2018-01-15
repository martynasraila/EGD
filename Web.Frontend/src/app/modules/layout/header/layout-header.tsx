import * as React from "react";
import { UserBox } from "./user-box/user-box";

import { HomeButton } from "./home-button/home-button";

import "./layout-header.css";

export class LayoutHeader extends React.Component {
    public render(): JSX.Element {
        return <div className="layout-header">
            <HomeButton />
            <div className="layout-navigation">
                <h1>Ekonomiško šiukšlių išvežimo sistema</h1>
            </div>
            <UserBox userTitle="Vardenis Pavardenis" />
        </div>;
    }
}
