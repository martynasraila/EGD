import * as React from "react";
import * as History from "history";
import * as url from "url";

import { Form, Text, Submit, ErrorsContainer } from "@simplr/react-forms-dom";
import { RequiredValidator } from "@simplr/react-forms-validation";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts/form";

import { ErrorTemplate } from "../../../../helpers/form-helpers";
import { ContainersActionsCreators } from "../../../../actions/containers/containers-actions-creators";
import { Configuration } from "../../../../configuration";

import "./administrator-container-create-cview.css";

interface Props {
    history: History.History;
}

interface ContainerCreateSubmitDto {
    address: string;
    description: string;
}

export class AdministratorContainerCreateCView extends React.Component<Props> {
    private onSubmit: FormOnSubmitCallback = async (event, store) => {
        const submitData = store.ToObject<ContainerCreateSubmitDto>();
        const path = url.resolve(Configuration.Api.Path, `api/containers`);

        try {
            await window.fetch(path, {
                method: "POST", headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any,
                body: JSON.stringify(submitData)
            });

            ContainersActionsCreators.ClearRequired();
            this.props.history.push("/administrator/containers");
        } catch (error) {
            console.error(error);
            alert("Nepavyko sukurti konteinerio. Bandykite dar kartą.");
        }

    }

    public render(): JSX.Element {
        return <div className="administrator-container-create-cview">
            <Form onSubmit={this.onSubmit}>
                <div className="form-field">
                    <label htmlFor="Address">
                        Adresas
                    </label>
                    <Text name="address" id="Address" className="form-control">
                        <RequiredValidator error="Adresas yra privalomas." />
                    </Text>
                </div>
                <div className="form-field">
                    <label htmlFor="Description">
                        Aprašymas
                    </label>
                    <Text name="description" id="Description" className="form-control">
                        <RequiredValidator error="Aprašymas yra privalomas." />
                    </Text>
                </div>
                <div className="submit-container">
                    <Submit disableOnPristine disableOnError className="btn btn-light">Pridėti</Submit>
                </div>
                <ErrorsContainer template={ErrorTemplate} />
            </Form>
        </div>;
    }
}
