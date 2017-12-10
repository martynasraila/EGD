import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IdentityStore } from "../../../../stores/identity/identity-store";
import { UserKind } from "../../../../stores/identity/identity-contracts";

class HomeButtonClass extends React.Component<RouteComponentProps<{}>> {
    private onHomeClick: React.MouseEventHandler<HTMLDivElement> = () => {
        if (IdentityStore.UserKind == null) {
            return;
        }

        switch (IdentityStore.UserKind)  {
            case UserKind.Administrator: {
                this.props.history.push({
                    pathname: "/administrator"
                });
                return;
            }
            case UserKind.Collector: {
                this.props.history.push({
                    pathname: "/collector"
                });
                return;
            }
        }
    }

    public render(): JSX.Element {
        return <div className="home-button" onClick={this.onHomeClick}>
            <i className="fa fa-recycle"></i>
        </div>;
    }
}

export const HomeButton = withRouter(HomeButtonClass);
