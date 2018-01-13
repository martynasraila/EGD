import * as React from "react";
import * as Immutable from "immutable";
import { Link } from "react-router-dom";
import { Form, CheckBox } from "@simplr/react-forms-dom";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";

import { ContainerDto } from "../../stores/containers/containers-contracts";

import "./containers-table-form-view.css";

interface Props {
    items: Immutable.Map<string, ContainerDto>;
    isAdministrator: boolean;
    onSubmit: FormOnSubmitCallback;
    formId: string;
}

export class ContainersTableFormView extends React.Component<Props> {
    private renderIdCell(id: number): JSX.Element {
        if (this.props.isAdministrator) {
            return <Link to={`/administrator/containers/${id}`}>{id}</Link>;
        } else {
            return <span>id</span>;
        }
    }

    public render(): JSX.Element {
        return <Form
            onSubmit={this.props.onSubmit}
            formId={this.props.formId}
            className="containers-table-form-view"
        >
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
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
                                    <CheckBox name={item.Id.toString()} />
                                </th>
                                <th>
                                    {this.renderIdCell(item.Id)}
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
        </Form>;
    }
}
