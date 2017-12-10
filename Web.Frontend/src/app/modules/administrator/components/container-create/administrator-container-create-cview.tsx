import * as React from "react";
import * as History from "history";
import { Form, Text, Submit, ErrorsContainer } from "@simplr/react-forms-dom";
import { RequiredValidator } from "@simplr/react-forms-validation";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts/form";

import { ErrorTemplate } from "../../../../helpers/form-helpers";
import { ContainersActionsCreators } from "../../../../actions/containers/containers-actions-creators";

import "./administrator-container-create-cview.css";

interface Props {
    history: History.History;
}

export class AdministratorContainerCreateCView extends React.Component<Props> {
    private onSubmit: FormOnSubmitCallback = (event, store) => {
        // TODO: implement.
        // const submitData = store.ToObject<LoginSubmitDto>();
        ContainersActionsCreators.ClearRequired();
        this.props.history.push("/administrator/containers");
    }

    public render(): JSX.Element {
        return <div className="administrator-container-create-cview">
            <Form onSubmit={this.onSubmit}>
                <div className="form-field">
                    <label htmlFor="Address">
                        Adresas
                    </label>
                    <Text name="Address" id="Address">
                        <RequiredValidator error="Adresas yra privalomas." />
                    </Text>
                </div>
                <div className="form-field">
                    <label htmlFor="Description">
                        Aprašymas
                    </label>
                    <Text name="Description" id="Description">
                        <RequiredValidator error="Aprašymas yra privalomas." />
                    </Text>
                </div>
                <div className="submit-container">
                    <Submit disableOnPristine disableOnError>Pridėti</Submit>
                </div>
                <ErrorsContainer template={ErrorTemplate} />
            </Form>
        </div>;
    }
}
