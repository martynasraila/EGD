import * as React from "react";
import { Form, Number, Submit } from "@simplr/react-forms-dom";
import { FormOnChangeCallback, FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";
import { DeviceDto } from "../../../../stores/devices/devices-contracts";

import "./administrator-device-form-cview.css";

interface Props {
    device?: DeviceDto;
    onSubmit: FormOnSubmitCallback;
    submitTitle: string;
}

interface FormData {
    PhotoStreak: number;
    ConfigurationStreak: number;
    PaddingLeft: number;
    PaddingRight: number;
    PaddingTop: number;
    PaddingBottom: number;
}

// TODO: implement validation.
export class AdministratorDeviceFormCView extends React.Component<Props, FormData> {
    constructor(props: Props, context: any) {
        super(props, context);
        let formData;

        if (props.device != null) {
            const { Id, ...rest } = props.device;
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
            ConfigurationStreak: 10,
            PaddingBottom: 10,
            PaddingLeft: 10,
            PaddingRight: 10,
            PaddingTop: 10,
            PhotoStreak: 10
        };
    }

    public render(): JSX.Element {
        const padding = `${this.state.PaddingTop}px ${this.state.PaddingRight}px ${this.state.PaddingBottom}px ${this.state.PaddingLeft}px`;

        return <div className="administrator-device-form-cview">
            <Form formId="device-form" className="device-form" onChange={this.onFormChange}>
                <div className="info-side">
                    <div className="field-container">
                        <div className="field-title">Nuotraukos darymo intervalas (min)</div>
                        <Number name="PhotoStreak" defaultValue={this.state.PhotoStreak}></Number>
                    </div>
                    <div className="field-container">
                        <div className="field-title">Konfigūracijos atnaujinimo intervalas (min)</div>
                        <Number name="ConfigurationStreak" defaultValue={this.state.ConfigurationStreak}></Number>
                    </div>
                </div>
                <div className="padding-side">
                    <div className="side-title">Analizuojama erdvė</div>
                    <div className="padding-content">
                        <div className="padding-horizontal">
                            <Number name="PaddingLeft" defaultValue={this.state.PaddingLeft}></Number>
                        </div>
                        <div>
                            <div className="padding-vertical">
                                <Number name="PaddingTop" defaultValue={this.state.PaddingTop}></Number>
                            </div>
                            <div className="padding-container">
                                <div className="photo-padding" style={{ padding: padding }}>
                                    <div className="border-container"></div>
                                </div>
                            </div>
                            <div className="padding-vertical">
                                <Number name="PaddingBottom" defaultValue={this.state.PaddingBottom}></Number>
                            </div>
                        </div>
                        <div className="padding-horizontal">
                            <Number name="PaddingRight" defaultValue={this.state.PaddingRight}></Number>
                        </div>
                    </div>
                </div>
            </Form>
            <Submit formId="device-form" className="btn btn-light">{this.props.submitTitle}</Submit>
            {/* {<ErrorsContainer template={ErrorTemplate} />} */}
        </div>;
    }
}
