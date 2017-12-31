import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { AdministratorCollectorView } from "../components/collector-view/administrator-collector-view";

interface Params {
    id: string;
}

interface State {
    Id?: number;
}

export class AdministratorCollectorViewRoute extends React.Component<RouteComponentProps<Params>, State> {
    public state: State = {
        Id: undefined
    };

    public componentDidMount(): void {
        const idParam = this.props.match.params.id;
        const id = Number(idParam);

        if (isNaN(id) || !isFinite(id)) {
            this.props.history.push("/administrator/collectors");
            return;
        }

        this.setState(state => ({
            Id: id
        } as State));
    }

    public render(): JSX.Element | null {
        if (this.state.Id == null) {
            return null;
        }

        return <AdministratorCollectorView id={this.state.Id} />;
    }
}
