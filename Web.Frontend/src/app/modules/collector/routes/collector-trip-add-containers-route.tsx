import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { CollectorTripAddContainerView } from "../components/trip-containers-add/collector-trip-add-container-view";

interface Params {
    id: string;
}

interface State {
    Id?: number;
}

export class CollectorTripAddContainersRoute extends React.Component<RouteComponentProps<Params>, State> {
    public state: State = {
        Id: undefined
    };

    public componentDidMount(): void {
        const idParam = this.props.match.params.id;
        const id = Number(idParam);

        if (isNaN(id) || !isFinite(id)) {
            this.props.history.push("/collector/trips");
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

        return <CollectorTripAddContainerView id={this.state.Id} />;
    }
}
