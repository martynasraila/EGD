import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { IdentityActionsCreators } from "../../../../actions/identity/identity-actions-creators";

import "./user-box.css";

interface Props {
    userTitle: string;
}

class UserBoxClass extends React.Component<RouteComponentProps<{}> & Props> {
    private onClick: React.MouseEventHandler<HTMLDivElement> = () => {
        IdentityActionsCreators.UserLoggedOut();
        this.props.history.push("/");
    }

    public render(): JSX.Element {
        return <div className="user-box">
            <div className="user-avatar">
                <i className="fa fa-user"></i>
            </div>
            <div className="user-title">{this.props.userTitle}</div>
            <div className="logout-button" onClick={this.onClick}>
                <i className="fa fa-sign-out"></i>
            </div>
        </div>;
    }
}

export const UserBox = withRouter(UserBoxClass);
