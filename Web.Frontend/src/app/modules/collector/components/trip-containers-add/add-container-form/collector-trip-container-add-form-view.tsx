import * as React from "react";
import * as url from "url";
import * as Immutable from "immutable";
import { withRouter } from "react-router-dom";
import { Submit } from "@simplr/react-forms-dom";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";
import { RouteComponentProps } from "react-router";

import { ContainersTableFormView } from "../../../../../components/containers-table-form-view/containers-table-form-view";
import { ContainerDto } from "../../../../../stores/containers/containers-contracts";

import { Configuration } from "../../../../../configuration";
import { TripContainersDto } from "../../../../../stores/trips/trips-contracts";
import { TripContainersMapStore } from "../../../../../stores/trips/trip-containers-map-store";

import "./administrator-collector-add-containers-form-view.css";

interface Props extends RouteComponentProps<{}> {
    tripId: number;
    items: Immutable.Map<string, ContainerDto>;
    startPriority: number;
}

class ContainerTripAddContainersFormViewClass extends React.Component<Props> {
    private readonly formId: string = "collector-trip-add-containers-form";

    private onSubmit: FormOnSubmitCallback = async (event, store) => {
        const submitData = store.ToObject<{ [key: string]: boolean }>();

        let priority = this.props.startPriority;

        const tripContainers = Object.keys(submitData).map<TripContainersDto | undefined>((x: string) => {
            if (submitData[x]) {
                return {
                    tripId: this.props.tripId,
                    containerId: Number(x),
                    containerPriority: ++priority
                } as TripContainersDto;
            }
        }).filter<TripContainersDto>((x: TripContainersDto | undefined): x is TripContainersDto => x != null);

        const path = url.resolve(Configuration.Api.Path, "Api/Trips_Containers");

        try {
            const promises = tripContainers.map(x =>
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
            this.props.history.push(`/collector/trips/${this.props.tripId}`);
            setTimeout(() => {
                TripContainersMapStore.InvalidateCache(this.props.tripId.toString());
            });
        } catch (error) {
            console.error(error);
            alert("Nepavyko išsaugoti duomenų.");
        }
    }

    public render(): JSX.Element {
        return <div className="collector-trip-container-add-containers-form-view">
            <ContainersTableFormView
                items={this.props.items}
                formId={this.formId}
                isAdministrator={false}
                onSubmit={this.onSubmit}
            />
            <div className="submit-container">
                <Submit formId={this.formId} className="btn btn-light">Pridėti</Submit>
            </div>
        </div>;
    }
}

export const ContainerTripAddContainersFormView = withRouter<Props>(ContainerTripAddContainersFormViewClass);
