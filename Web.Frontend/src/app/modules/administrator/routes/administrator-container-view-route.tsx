import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

interface Params {
    id: string;
}

interface State {
    Id?: number;
}

export class AdministratorContainerViewRoute extends React.Component<RouteComponentProps<Params>, State> {

    public state: State = {
        Id: undefined
    };

    public componentDidMount(): void {
        const idParam = this.props.match.params.id;
        const id = Number(idParam);

        if (isNaN(id) || !isFinite(id)) {
            this.props.history.push("/administrator/containers");
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

        return <div>{this.state.Id}</div>;
    }
}
