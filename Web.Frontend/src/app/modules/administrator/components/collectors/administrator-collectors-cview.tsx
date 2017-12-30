import * as React from "react";
import * as Immutable from "immutable";
import { CollectorDto } from "../../../../stores/collectors/collectors-contracts";
import { Link } from "react-router-dom";

interface Props {
    items: Immutable.Map<string, CollectorDto>;
}

export class AdministratorCollectorsCView extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="administrator-containers-cview">
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Vartotojo vardas</th>
                        <th>Pavadinimas</th>
                        <th>Aprašymas</th>
                        <th>Priskirta konteinerių</th>
                        <th>Kelionių skaičius</th>
                        <th>Paskutinės kelionės data</th>
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
                                    <Link to={`/administrator/collectors/${item.Id}`}>{item.Id}</Link>
                                </th>
                                <th>{item.UserName}</th>
                                <th>{item.Title}</th>
                                <th>{item.Description}</th>
                                <th>{/*item.ContainersCount*/}</th>
                                <th>{/*item.TripsCount*/}</th>
                                <th>{/*item.LastTripDate*/}</th>
                            </tr>;
                        })
                        .toArray()}
                </tbody>
            </table>
        </div>;
    }
}
