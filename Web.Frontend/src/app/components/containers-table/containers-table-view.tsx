import * as React from "react";
import * as Immutable from "immutable";
import { Link } from "react-router-dom";

import { ContainerDto } from "../../stores/containers/containers-contracts";

interface Props {
    items: Immutable.Map<string | number, ContainerDto>;
    isAdministrator: boolean;
}

export class ContainersTableView extends React.Component<Props> {
    private renderIdCell(id: number): JSX.Element {
        if (this.props.isAdministrator) {
            return <Link to={`/administrator/containers/${id}`}>{id}</Link>;
        } else {
            return <span>{id}</span>;
        }
    }

    public render(): JSX.Element {
        return <table className="table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Aprašymas</th>
                    <th>Adresas</th>
                    <th>Koordinatės</th>
                </tr>
            </thead>
            <tbody>
                {this.props.items
                    .map(item => {
                        if (item == null) {
                            return null;
                        }

                        return <tr key={`table-key-${item.id}`}>
                            <th>
                                {this.renderIdCell(item.id)}
                            </th>
                            <th>{item.description}</th>
                            <th>{item.address}</th>
                            <th>{`${item.longitude || "-"}, ${item.latitude || "-"}`}</th>
                        </tr>;
                    })
                    .toArray()}
            </tbody>
        </table>;
    }
}
