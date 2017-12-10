import * as React from "react";

import "./login-header.css";

export class LoginHeader extends React.PureComponent {
    public render(): JSX.Element {
        return <div className="login-header">
            <i className="fa fa-recycle"></i>
            <div className="title-container">
                Ekonomiško šiukšlių išvežimo sistema
            </div>
        </div>;
    }
}
