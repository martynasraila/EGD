import * as React from "react";
import * as Immutable from "immutable";
import { Link } from "react-router-dom";

import {
    // Radio,
    RadioGroup,
    Form
} from "@simplr/react-forms-dom";
import { TripDto } from "../../../../stores/trips/trips-contracts";
// import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";

interface Props {
    items: Immutable.Map<string, TripDto>;
    // onSubmit: FormOnSubmitCallback;
}

export const FORM_ID = "collector-trips-form";

export class CollectorTripsFormCView extends React.Component<Props> {
    private renderIdCell(id: number): JSX.Element {
        return <Link to={`/collector/trips/${id}`}>{id}</Link>;
    }

    public render(): JSX.Element {
        return <Form
            className="collector-trips-cview"
            formId={FORM_ID}
        // onSubmit={this.props.onSubmit}
        >
            <RadioGroup name="tripId">
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th></th> */}
                            <th>Kelionės Id</th>
                            <th>Sukūrimo data</th>
                            <th>Pradžios data</th>
                            <th>Pabaigos data</th>
                            <th>Konteinerių skaičius</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items
                            .map(item => {
                                if (item == null) {
                                    return null;
                                }

                                return <tr key={`table-key-${item.id}`}>
                                    {/* <th><Radio value={item.id.toString()} /></th> */}
                                    <th>
                                        {this.renderIdCell(item.id)}
                                    </th>
                                    <th>{item.dateCreated}</th>
                                    <th>{item.startDate}</th>
                                    <th>{item.endDate}</th>
                                    {/* TODO: implement container count */}
                                    <th></th>
                                </tr>;
                            })
                            .toArray()}
                    </tbody>
                </table>
            </RadioGroup>
        </Form>;
    }
}
