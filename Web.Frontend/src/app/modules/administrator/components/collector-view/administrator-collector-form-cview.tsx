import * as React from "react";
import * as url from "url";
import * as crypto from "crypto";
import { Form, Text, Submit, ErrorsContainer } from "@simplr/react-forms-dom";
import { RequiredValidator } from "@simplr/react-forms-validation";
import { generate } from "randomstring";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";

import { CollectorDto } from "../../../../stores/collectors/collectors-contracts";
import { HiddenString } from "../../../../components/hidden-string/hidden-string";
import { ErrorTemplate } from "../../../../helpers/form-helpers";

import "./administrator-collector-form-cview.css";
import { Configuration } from "../../../../configuration";
import { CollectorsActionsCreators } from "../../../../actions/collectors/collectors-actions-creators";
import { CollectorsMapStore } from "../../../../stores/collectors/collectors-map-store";

interface Props {
    collector: CollectorDto;
}

export class AdministratorCollectorFormCView extends React.Component<Props> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.temporaryPassword = generate({
            readable: true,
            capitalization: "alphanumeric",
            length: 12
        });
    }

    private temporaryPassword: string;

    private resetPassword = async () => {
        const path = url.resolve(Configuration.Api.Path, "api/collectors/");

        const hash = crypto.createHash("sha256");
        const passwordHash = hash.update(this.temporaryPassword).digest("hex").toString();

        try {
            await window.fetch(path, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any,
                body: JSON.stringify({
                    ...this.props.collector,
                    passwordHash: passwordHash
                })
            });

            alert(`Slaptažodis sėkmingai nustatytas. Užsirašykite šį slaptažodį: ${this.temporaryPassword}`);

            CollectorsActionsCreators.ClearRequired();
            CollectorsMapStore.InvalidateCache(this.props.collector.id.toString());
        } catch (error) {
            console.error(error);
            alert("Nepavyko išsaugoti pakeitimų.");
        }
    }

    private onResetPasswordClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        this.resetPassword();
    }

    private onSubmit: FormOnSubmitCallback = async (event, store) => {
        const submitData = store.ToObject();

        const path = url.resolve(Configuration.Api.Path, "api/collectors/");

        try {
            await window.fetch(path, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any,
                body: JSON.stringify({
                    ...this.props.collector,
                    ...submitData
                })
            });

            CollectorsActionsCreators.ClearRequired();
            CollectorsMapStore.InvalidateCache(this.props.collector.id.toString());
        } catch (error) {
            console.error(error);
            alert("Nepavyko išsaugoti pakeitimų.");
        }
    }

    public render(): JSX.Element {
        return <div className="administrator-collector-form-cview">
            <Form onSubmit={this.onSubmit}>
                <div className="form-field">
                    <label htmlFor="UserName">
                        Vartotojo vardas
                    </label>
                    <Text name="userName" id="UserName" initialValue={this.props.collector.userName}>
                        <RequiredValidator error="Vartotojo vardas yra privalomas." />
                    </Text>
                </div>
                <div className="form-field">
                    <label htmlFor="Title">
                        Pavadinimas
                    </label>
                    <Text name="title" id="Title" initialValue={this.props.collector.title}>
                        <RequiredValidator error="Pavadinimas yra privalomas." />
                    </Text>
                </div>
                <div className="form-field">
                    <label htmlFor="Description">
                        Aprašymas
                    </label>
                    <Text name="description" id="Description" initialValue={this.props.collector.description}>
                        <RequiredValidator error="Aprašymas yra privalomas." />
                    </Text>
                </div>
                <div className="submit-container">
                    <Submit disableOnPristine disableOnError className="btn btn-light">Išsaugoti</Submit>
                </div>
                <ErrorsContainer template={ErrorTemplate} />
            </Form>
            <div className="form-field">
                <label htmlFor="Description">
                    Laikinas slaptažodis
                </label>
                <HiddenString text={this.temporaryPassword} />
            </div>
            <button onClick={this.onResetPasswordClick} className="btn btn-light">Nustatyti slaptažodį į naują laikiną slaptažodį</button>
        </div>;
    }
}
