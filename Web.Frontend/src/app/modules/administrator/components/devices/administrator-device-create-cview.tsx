import * as React from "react";
import * as url from "url";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";

import { AdministratorDeviceFormCView } from "./administrator-device-form-cview";
import { Configuration } from "../../../../configuration";

import { ContainersMapStore } from "../../../../stores/containers/containers-map-store";
import { ContainerDto } from "../../../../stores/containers/containers-contracts";

import "./administrator-device-create-cview.css";

interface Props {
    container: ContainerDto;
}

class AdministratorDeviceCreateCViewClass extends React.Component<RouteComponentProps<{}> & Props> {
    private onSubmit: FormOnSubmitCallback = async (event, store) => {
        const submitData = store.ToObject();

        const path = url.resolve(Configuration.Api.Path, "api/EGD");

        try {
            const response = await window.fetch(path, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any,
                body: JSON.stringify({
                    ...submitData
                })
            });

            const newId = await response.text();

            const updateContainerPath = url.resolve(Configuration.Api.Path, "Api/Containers");

            await window.fetch(updateContainerPath, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any,
                body: JSON.stringify({
                    ...this.props.container,
                    egDid: Number(newId)
                } as ContainerDto)
            });

            this.props.history.push(`/administrator/containers/${this.props.container.id}`);
            ContainersMapStore.InvalidateCache(this.props.container.id.toString());
        } catch (error) {
            console.error(error);
            alert("Nepavyko išsaugoti pakeitimų.");
        }
    }

    public render(): JSX.Element {
        return <div className="administrator-device-create-cview">
            <AdministratorDeviceFormCView onSubmit={this.onSubmit} submitTitle="Pridėti" />
        </div>;
    }
}

export const AdministratorDeviceCreateCView = withRouter(AdministratorDeviceCreateCViewClass);
