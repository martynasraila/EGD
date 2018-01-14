import * as React from "react";
import * as url from "url";
import * as crypto from "crypto";

import { LoginHeader } from "./header/login-header";
import { Form, Text, Password, Submit, ErrorsContainer } from "@simplr/react-forms-dom";
import { RequiredValidator, ByteLengthValidator } from "@simplr/react-forms-validation";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";

import { FieldValidationType } from "@simplr/react-forms/contracts";
import { IdentityActionsCreators } from "../../actions/identity/identity-actions-creators";

import { ErrorTemplate } from "../../helpers/form-helpers";

import { Configuration } from "../../configuration";
import { IdentityDto } from "../../stores/identity/identity-store";

import "./login.css";

interface LoginSubmitDto {
    Username: string;
    Password: string;
}

export class Login extends React.Component {
    private onSubmit: FormOnSubmitCallback = async (event, store) => {
        const submitData = store.ToObject<LoginSubmitDto>();

        const path = url.resolve(Configuration.Api.Path, `api/login/${submitData.Username}`);

        try {
            const response = await window.fetch(path, {
                method: "POST", headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any
            });

            const identity = await response.json() as IdentityDto;

            const hash = crypto.createHash("sha256");
            const passwordHash = hash.update(submitData.Password).digest("hex").toString();

            console.log(submitData.Username, submitData.Password, passwordHash);

            if (identity.passwordHash && passwordHash === identity.passwordHash) {
                IdentityActionsCreators.UserLoggedIn(identity);
            } else {
                throw new Error("Wrong credentials.");
            }
        } catch (error) {
            console.error(error);
            alert("Neteisingi prisijungimo duomenys.");
        }
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
                            <Text name="Username" id="Username" className="form-control">
                                <RequiredValidator error="Vartotojo vardas yra privalomas." />
                                <ByteLengthValidator options={{ min: 3, max: 200 }} error="Per trumpas vartotojo vardas." />
                            </Text>
                        </div>
                        <div className="form-field">
                            <label htmlFor="Password">
                                Slaptažodis
                            </label>
                            <Password name="Password" id="Password" className="form-control">
                                <RequiredValidator error="Slaptažodis yra privalomas" />
                                <ByteLengthValidator options={{ min: 3, max: 200 }} error="Per trumpas slaptažodis." />
                            </Password>
                        </div>
                        <div className="controls-box">
                            <ErrorsContainer template={ErrorTemplate} />
                            <div className="submit-container">
                                <Submit disableOnError disableOnPristine className="btn btn-light">Prisijungti</Submit>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>;
    }
}
