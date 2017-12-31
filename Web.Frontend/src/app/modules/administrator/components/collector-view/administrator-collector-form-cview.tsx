import * as React from "react";
import { Form, Text, Submit, ErrorsContainer } from "@simplr/react-forms-dom";
import { RequiredValidator } from "@simplr/react-forms-validation";
import { generate } from "randomstring";

import { CollectorDto } from "../../../../stores/collectors/collectors-contracts";
import { HiddenString } from "../../../../components/hidden-string/hidden-string";
import { ErrorTemplate } from "../../../../helpers/form-helpers";

import "./administrator-collector-form-cview.css";

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

    private onResetPasswordClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        // TODO: implement
    }

    private onSubmit = () => {
        // TODO: implement
    }

    public render(): JSX.Element {
        return <div className="administrator-collector-form-cview">
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
                <div className="submit-container">
                    <Submit disableOnPristine disableOnError>Išsaugoti</Submit>
                </div>
                <ErrorsContainer template={ErrorTemplate} />
            </Form>
            <div className="form-field">
                <label htmlFor="Description">
                    Laikinas slaptažodis
                </label>
                <HiddenString text={this.temporaryPassword} />
            </div>
            <button onClick={this.onResetPasswordClick}>Nustatyti slaptažodį į naują laikiną slaptažodį</button>
        </div>;
    }
}
