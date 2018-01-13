import * as React from "react";
import * as url from "url";
import * as Immutable from "immutable";
import { withRouter } from "react-router-dom";
import { Submit } from "@simplr/react-forms-dom";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";

import { ContainersTableFormView } from "../../../../../components/containers-table-form-view/containers-table-form-view";
import { ContainerDto } from "../../../../../stores/containers/containers-contracts";

import "./administrator-collector-add-containers-form-view.css";
import { CollectorContainerDto } from "../../../../../stores/collectors/collectors-contracts";
import { Configuration } from "../../../../../configuration";
import { CollectorContainersMapStore } from "../../../../../stores/collectors/collector-containers-map-store";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps<{}> {
    collectorId: number;
    items: Immutable.Map<number, ContainerDto>;
}

class AdministratorContainerAddContainersFormViewClass extends React.Component<Props> {
    private readonly formId: string = "administrator-collector-add-containers-form";

    private onSubmit: FormOnSubmitCallback = async (event, store) => {
        const submitData = store.ToObject<{ [key: string]: boolean }>();

        const collectorContainers = Object.keys(submitData).map<CollectorContainerDto | undefined>(x => {
            if (submitData[x]) {
                return {
                    collectorId: this.props.collectorId,
                    containerId: Number(x)
                };
            }
        }).filter<CollectorContainerDto>((x): x is CollectorContainerDto => x != null);

        const path = url.resolve(Configuration.Api.Path, "Api/Collectors_Containers");

        try {
            const promises = collectorContainers.map(x =>
                (async () => {
                    window.fetch(path, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        } as any,
                        body: JSON.stringify(x)
                    });
                })());

            await Promise.all(promises);
            CollectorContainersMapStore.InvalidateCache(this.props.collectorId.toString());
            this.props.history.push(`/administrator/collectors/${this.props.collectorId}`);
        } catch (error) {
            console.error(error);
            alert("Nepavyko išsaugoti duomenų.");
        }
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

export const AdministratorContainerAddContainersFormView = withRouter<Props>(AdministratorContainerAddContainersFormViewClass);
