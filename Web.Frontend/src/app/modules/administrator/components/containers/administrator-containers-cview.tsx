import * as React from "react";
import * as Immutable from "immutable";
import { Link } from "react-router-dom";
import { ContainerDto } from "../../../../stores/containers/containers-contracts";

interface Props {
    items: Immutable.Map<string, ContainerDto>;
}

export class AdministratorContainersCView extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="administrator-containers-cview">
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Būsena</th>
                        <th>Paskutinį kartą atnaujinta</th>
                        <th>Aprašymas</th>
                        <th>Adresas</th>
                        <th>Koordinatės</th>
                        <th>Stebėjimas</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.items
                        .map(item => {
                            if (item == null) {
                                return null;
                            }

                            return <tr key={`table-key-${item.Id}`}>
                                <th>
                                    <Link to={`/administrator/containers/${item.Id}`}>{item.Id}</Link>
                                </th>
                                <th>{item.LastStateId}</th>
                                <th>{item.LastStateId}</th>
                                <th>{item.Description}</th>
                                <th>{item.Address}</th>
                                <th>{`${item.Longitude}, ${item.Latitude}`}</th>
                                <th>{item.EgdId}</th>
                            </tr>;
                        })
                        .toArray()}
                </tbody>
            </table>
        </div>;
    }
}
