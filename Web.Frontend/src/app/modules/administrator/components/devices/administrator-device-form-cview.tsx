import * as React from "react";
import * as url from "url";
import { Form, Number, Submit } from "@simplr/react-forms-dom";
import { FormOnChangeCallback, FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";
import { DeviceDto } from "../../../../stores/devices/devices-contracts";

import { DevicesMapStore } from "../../../../stores/devices/devices-map-store";
import { Configuration } from "../../../../configuration";

import "./administrator-device-form-cview.css";

interface Props {
    device?: DeviceDto;
    onSubmit: FormOnSubmitCallback;
    submitTitle: string;
}

interface FormData {
    photoStreak: number;
    configurationStreak: number;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom: number;
}

// TODO: implement validation.
export class AdministratorDeviceFormCView extends React.Component<Props, FormData> {
    constructor(props: Props, context: any) {
        super(props, context);
        let formData;

        if (props.device != null) {
            const { id, ...rest } = props.device;
            formData = rest;
        } else {
            formData = this.defaultFormData;
        }

        this.state = formData;
    }

    private onFormChange: FormOnChangeCallback = (event, newValue, fieldId, store) => {
        this.setState(store.ToObject<FormData>());
    }

    private get defaultFormData(): FormData {
        return {
            configurationStreak: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            photoStreak: 10
        };
    }

    public render(): JSX.Element {
        const padding = `${this.state.paddingTop}px ${this.state.paddingRight}px ${this.state.paddingBottom}px ${this.state.paddingLeft}px`;

        return <div className="administrator-device-form-cview">
            <Form formId="device-form" className="device-form" onChange={this.onFormChange} onSubmit={this.props.onSubmit}>
                <div className="info-side">
                    <div className="field-container">
                        <div className="field-title">Nuotraukos darymo intervalas (min)</div>
                        <Number name="photoStreak" defaultValue={this.state.photoStreak}></Number>
                    </div>
                    <div className="field-container">
                        <div className="field-title">Konfigūracijos atnaujinimo intervalas (min)</div>
                        <Number name="configurationStreak" defaultValue={this.state.configurationStreak}></Number>
                    </div>
                </div>
                <div className="padding-side">
                    <div className="side-title">Analizuojama erdvė</div>
                    <div className="padding-content">
                        <div className="padding-horizontal">
                            <Number name="paddingLeft" defaultValue={this.state.paddingLeft}></Number>
                        </div>
                        <div>
                            <div className="padding-vertical">
                                <Number name="paddingTop" defaultValue={this.state.paddingTop}></Number>
                            </div>
                            <div className="padding-container">
                                <div className="photo-padding" style={{ padding: padding }}>
                                    <div className="border-container"></div>
                                </div>
                            </div>
                            <div className="padding-vertical">
                                <Number name="paddingBottom" defaultValue={this.state.paddingBottom}></Number>
                            </div>
                        </div>
                        <div className="padding-horizontal">
                            <Number name="paddingRight" defaultValue={this.state.paddingRight}></Number>
                        </div>
                    </div>
                </div>
            </Form>
            <Submit formId="device-form" className="btn btn-light">{this.props.submitTitle}</Submit>
            {/* {<ErrorsContainer template={ErrorTemplate} />} */}
        </div>;
    }
}
