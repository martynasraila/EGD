import * as React from "react";
import * as History from "history";
import { generate } from "randomstring";
import { Form, Text, ErrorsContainer, Submit } from "@simplr/react-forms-dom";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";
import { RequiredValidator } from "@simplr/react-forms-validation";

import { CollectorsActionsCreators } from "../../../../actions/collectors/collectors-actions-creators";
import { ErrorTemplate } from "../../../../helpers/form-helpers";
import { HiddenString } from "../../../../components/hidden-string/hidden-string";

import "./administrator-collector-create-cview.css";

interface Props {
    history: History.History;
}

export class AdministratorCollectorCreateCView extends React.Component<Props> {
    constructor(props: Props, context: any) {
        super(props, context);

        this.temporaryPassword = generate({
            readable: true,
            capitalization: "alphanumeric",
            length: 12
        });
    }

    private temporaryPassword: string;

    private onSubmit: FormOnSubmitCallback = (event, store) => {
        // TODO: implement.
        // const submitData = store.ToObject<LoginSubmitDto>();
        CollectorsActionsCreators.ClearRequired();
        this.props.history.push("/administrator/collectors");
    }

    public render(): JSX.Element {
        return <div className="administrator-collector-create-cview">
            <Form onSubmit={this.onSubmit}>
                <div className="form-field">
                    <label htmlFor="UserName">
                        Vartotojo vardas
                    </label>
                    <Text name="UserName" id="UserName">
                        <RequiredValidator error="Vartotojo vardas yra privalomas." />
                    </Text>
                </div>
                <div className="form-field">
                    <label htmlFor="Title">
                        Pavadinimas
                    </label>
                    <Text name="Title" id="Title">
                        <RequiredValidator error="Pavadinimas yra privalomas." />
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
                <div className="form-field">
                    <label htmlFor="Description">
                        Laikinas slaptažodis
                    </label>
                    <HiddenString text={this.temporaryPassword}/>
                </div>
                <div className="submit-container">
                    <Submit disableOnPristine disableOnError>Pridėti</Submit>
                </div>
                <ErrorsContainer template={ErrorTemplate} />
            </Form>
        </div>;
    }
}
