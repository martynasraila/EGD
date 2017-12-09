import * as React from "react";

import "./user-box.css";

interface Props {
    userTitle: string;
}

export class UserBox extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="user-box">
            <div className="user-avatar">
                <i className="fa fa-user"></i>
            </div>
            <div className="user-title">{this.props.userTitle}</div>
            <div className="logout-button">
                <i className="fa fa-sign-out"></i>
            </div>
        </div>;
    }
}
