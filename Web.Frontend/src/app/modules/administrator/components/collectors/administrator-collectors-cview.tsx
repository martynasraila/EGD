import * as React from "react";
import * as Immutable from "immutable";
import { CollectorDto } from "../../../../stores/collectors/collectors-contracts";
import { Link } from "react-router-dom";

interface Props {
    items: Immutable.Map<number, CollectorDto>;
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
                                    <Link to={`/administrator/collectors/${item.id}`}>{item.id}</Link>
                                </th>
                                <th>{item.userName}</th>
                                <th>{item.title}</th>
                                <th>{item.description}</th>
                            </tr>;
                        })
                        .toArray()}
                </tbody>
            </table>
        </div>;
    }
}
