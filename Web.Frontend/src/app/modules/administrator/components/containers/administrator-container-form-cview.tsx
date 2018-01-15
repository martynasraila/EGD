import * as React from "react";
import * as url from "url";

import { Form, TextArea, Submit, Number } from "@simplr/react-forms-dom";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";

import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { ContainerState } from "../../../../stores/states/states-contracts";
import { Configuration } from "../../../../configuration";
import { ContainersActionsCreators } from "../../../../actions/containers/containers-actions-creators";
import { ContainersMapStore } from "../../../../stores/containers/containers-map-store";

interface Props {
    container: ContainerDto;
    lastState?: ContainerState;
}

interface ContainerFormDto {
    id?: number;
    address: string;
    longitude?: number;
    latitude?: number;
    description: string;
}

//TODO: implement validation.
export class AdministratorContainerFormCView extends React.Component<Props> {
    private resolveStateString(): string {
        if (this.props.lastState == null) {
            return "-";
        }

        return `${this.props.lastState.StateValueId} ${this.props.lastState.Date}`;
    }

    private onSubmit: FormOnSubmitCallback = async (event, store) => {
        const submitData = store.ToObject<ContainerFormDto>();

        const path = url.resolve(Configuration.Api.Path, "api/containers/");

        try {
            await window.fetch(path, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any,
                body: JSON.stringify({
                    ...this.props.container,
                    ...submitData
                })
            });

            ContainersActionsCreators.ClearRequired();
            ContainersMapStore.InvalidateCache(this.props.container.id.toString());
        } catch (error) {
            console.error(error);
            alert("Nepavyko išsaugoti pakeitimų.");
        }
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
                        <Number name="longitude" className="form-control" defaultValue={this.props.container.longitude} />
                    </div>
                </div>
                <div className="field-container">
                    <div className="field-title">Platuma</div>
                    <div>
                        <Number name="latitude" className="form-control" defaultValue={this.props.container.latitude} />
                    </div>
                </div>
                <div className="field-container">
                    <div className="field-title">Adresas</div>
                    <div>
                        <TextArea name="address" className="form-control" defaultValue={this.props.container.address.trim()}></TextArea>
                    </div>
                </div>
                <div className="field-container">
                    <div className="field-title">Aprašymas</div>
                    <div>
                        <TextArea name="description" className="form-control" defaultValue={this.props.container.description.trim()}></TextArea>
                    </div>
                </div>
                <Submit className="btn btn-light">Išsaugoti</Submit>
                {/* {<ErrorsContainer template={ErrorTemplate} />} */}
            </Form>
        </div>;
    }
}
