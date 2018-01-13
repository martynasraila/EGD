import * as React from "react";
import * as Immutable from "immutable";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";
import { Link } from "react-router-dom";

import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { ContainerStore } from "../../../../stores/containers/containers-store";
import { AdministratorContainersCView } from "../../components/containers/administrator-containers-cview";
import { ContainersActionsCreators } from "../../../../actions/containers/containers-actions-creators";

import "./administrator-containers-container.css";

interface State {
    Status: Abstractions.ItemStatus;
    Items: Immutable.Map<number, ContainerDto>;
}

class AdministratorContainersContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [ContainerStore];
    }

    public static calculateState(state: State): State {
        const status = ContainerStore.Status;
        if (status === Abstractions.ItemStatus.Init) {
            setTimeout(() => ContainersActionsCreators.LoadRequired());
        }

        return {
            Items: ContainerStore.Items,
            Status: ContainerStore.Status
        };
    }

    public renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <div>Kraunama...</div>;
            }
            case Abstractions.ItemStatus.Loaded: {
                return <AdministratorContainersCView items={this.state.Items} />;
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>
                    Sąrašas tuščias.
                </div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Nepavyko užkrauti sąrašo.</div>;
            }
        }
    }

    public render(): JSX.Element {
        return <div className="administrator-containers-container">
            <div className="controls-section">
                <Link className="btn btn-light" to="/administrator/container/create">Pridėti naują</Link>
            </div>
            {this.renderStatuses()}
        </div>;
    }
}

export const AdministratorContainersContainer = Container.create(AdministratorContainersContainerClass);
