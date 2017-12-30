import * as React from "react";

import { Form, TextArea, Submit, Number } from "@simplr/react-forms-dom";

import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { ContainerState } from "../../../../stores/states/states-contracts";

interface Props {
    container: ContainerDto;
    lastState?: ContainerState;
}

//TODO: implement form.
export class AdministratorContainerFormCView extends React.Component<Props> {
    private resolveStateString(): string {
        if (this.props.lastState == null) {
            return "-";
        }

        return `${this.props.lastState.StateValueId} ${this.props.lastState.Date}`;
    }

    // TODO: implement.
    private onSubmit = () => {
        throw new Error("Not implemented.");
    }

    public render(): JSX.Element {
        return <div>
            <Form formId="container-form" onSubmit={this.onSubmit}>
                <div className="field-container">
                    <div className="field-title">Būsena</div>
                    <div>{this.resolveStateString()}</div>
                </div>
                <div className="field-container">
                    <div className="field-title">Ilguma</div>
                    <div>
                        <Number name="Longitude" defaultValue={this.props.container.Longitude} />
                    </div>
                </div>
                <div className="field-container">
                    <div className="field-title">Platuma</div>
                    <div>
                        <Number name="Latitude" defaultValue={this.props.container.Latitude} />
                    </div>
                </div>
                <div className="field-container">
                    <div className="field-title">Adresas</div>
                    <div>
                        <TextArea name="Address" defaultValue={this.props.container.Address}></TextArea>
                    </div>
                </div>
                <div className="field-container">
                    <div className="field-title">Aprašymas</div>
                    <div>
                        <TextArea name="Description" defaultValue={this.props.container.Description}></TextArea>
                    </div>
                </div>
                <Submit className="btn btn-light">Išsaugoti</Submit>
            </Form>
        </div>;
    }
}
