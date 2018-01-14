import * as React from "react";
import * as Immutable from "immutable";
import * as classNames from "classnames";

import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";
import { BubbleLoader } from "simplr-loaders";
import { Link } from "react-router-dom";

import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { CollectorContainersMapStore } from "../../../../stores/collectors/collector-containers-map-store";
import { LabeledContainer } from "../../../../components/labeled-container/labeled-container";
import { ContainersTableView } from "../../../../components/containers-table/containers-table-view";
import { ContainersMapStore } from "../../../../stores/containers/containers-map-store";
import { ItemsStatusResolver } from "../../../../helpers/flux-helpers";
import { UserKind } from "../../../../stores/identity/identity-contracts";

interface Props {
    id: number;
    userKind: UserKind;
    className?: string;
}

interface State {
    Status: Abstractions.ItemStatus;
    Items?: Immutable.Map<string, ContainerDto>;
}

class AdministratorCollectorContainersContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [CollectorContainersMapStore, ContainersMapStore];
    }

    public static calculateState(state: State, props: Props): State {
        const item = CollectorContainersMapStore.get(props.id.toString());

        if (item.Value == null) {
            return {
                Items: undefined,
                Status: item.Status
            };
        }

        if (item.Value.size === 0) {
            return {
                Status: Abstractions.ItemStatus.NoData
            };
        }

        // x should be defined.
        const containersList = item.Value.map<string>(x => x!.containerId.toString()).toArray();

        const requestedContainers = ContainersMapStore.getAll(containersList);

        const itemsStatus = ItemsStatusResolver(...requestedContainers.map(x => x!.Status).toArray());

        if (itemsStatus !== Abstractions.ItemStatus.Loaded) {
            return {
                Status: itemsStatus
            };
        }

        const itemsMap = requestedContainers.map(x => x!.Value as ContainerDto).toMap();

        return {
            Items: itemsMap,
            Status: Abstractions.ItemStatus.Loaded
        };
    }

    public renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <BubbleLoader />;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Items != null && this.state.Items.size !== 0) {
                    return <ContainersTableView items={this.state.Items} isAdministrator />;
                }
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>
                    Konteinerių nerasta.
                </div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Nepavyko užkrauti sąrašo.</div>;
            }
        }
    }

    private renderControls(): JSX.Element[] | null {
        if (this.props.userKind !== UserKind.Administrator) {
            return null;
        }

        return [
            <Link
                key="add-container-button"
                className="btn btn-light"
                to={`/administrator/collectors/${this.props.id}/add-container`}
            >
                Pridėti
            </Link>
        ];
    }

    public render(): JSX.Element {
        return <LabeledContainer
            title="Vežėjo konteineriai"
            className={classNames("administrator-collector-containers-container", this.props.className)}
            controls={this.renderControls()}
        >
            {this.renderStatuses()}
        </LabeledContainer>;
    }
}

export const AdministratorCollectorContainersContainer = Container.create(
    AdministratorCollectorContainersContainerClass,
    { withProps: true }
);
