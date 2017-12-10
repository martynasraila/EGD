import * as React from "react";

import { LoginHeader } from "./header/login-header";
import { Form, Text, Password, Submit, ErrorsContainer } from "@simplr/react-forms-dom";
import { RequiredValidator, ByteLengthValidator } from "@simplr/react-forms-validation";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";

import { FieldValidationType } from "@simplr/react-forms/contracts";
import { UserLoggedIn } from "../../actions/identity/identity-actions-creators";
import { UserKind } from "../../stores/identity/identity-contracts";

import { ErrorTemplate } from "../../helpers/form-helpers";

import "./login.css";

// interface LoginSubmitDto {
//     Username: string;
//     Password: string;
// }

export class Login extends React.Component {
    private onSubmit: FormOnSubmitCallback = (event, store) => {
        // const submitData = store.ToObject<LoginSubmitDto>();
        UserLoggedIn("1", UserKind.Administrator);
    }

    public render(): JSX.Element {
        return <div className="login">
            <LoginHeader />
            <div className="login-content">
                <div className="login-box">
                    <span className="login-title">
                        Prisijunkite
                    </span>
                    <Form onSubmit={this.onSubmit} fieldsValidationType={FieldValidationType.OnValueChange}>
                        <div className="form-field">
                            <label htmlFor="Username">
                                Vartotojo vardas
                            </label>
                            <Text name="Username" id="Username">
                                <RequiredValidator error="Vartotojo vardas yra privalomas." />
                                <ByteLengthValidator options={{ min: 3, max: 200 }} error="Per trumpas vartotojo vardas." />
                            </Text>
                        </div>
                        <div className="form-field">
                            <label htmlFor="Password">
                                Slaptažodis
                            </label>
                            <Password name="Password" id="Password">
                                <RequiredValidator error="Slaptažodis yra privalomas" />
                                <ByteLengthValidator options={{ min: 3, max: 200 }} error="Per trumpas slaptažodis." />
                            </Password>
                        </div>
                        <div className="controls-box">
                            <ErrorsContainer template={ErrorTemplate} />
                            <div className="submit-container">
                                <Submit disableOnError disableOnPristine>Prisijungti</Submit>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>;
    }
}
