import * as React from "react";
import * as Immutable from "immutable";
import { Submit } from "@simplr/react-forms-dom";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";

import { ContainersTableFormView } from "../../../../../components/containers-table-form-view/containers-table-form-view";
import { ContainerDto } from "../../../../../stores/containers/containers-contracts";

import "./administrator-collector-add-containers-form-view.css";

interface Props {
    items: Immutable.Map<string, ContainerDto>;
}

export class AdministratorContainerAddContainersFormView extends React.Component<Props> {
    private readonly formId: string = "administrator-collector-add-containers-form";

    private onSubmit: FormOnSubmitCallback = (event, store) => {
        // TODO: implement.
    }

    public render(): JSX.Element {
        return <div className="administrator-container-add-containers-form-view">
            <ContainersTableFormView
                items={this.props.items}
                formId={this.formId}
                isAdministrator
                onSubmit={this.onSubmit}
            />
            <div className="submit-container">
                <Submit formId={this.formId} className="btn btn-light">Pridėti</Submit>
            </div>
        </div>;
    }
}
