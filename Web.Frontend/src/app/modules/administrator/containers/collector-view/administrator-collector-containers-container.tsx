import * as React from "react";
import * as Immutable from "immutable";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";
import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { CollectorContainersMapStore } from "../../../../stores/collectors/collector-conatiners-map-store";
import { LabeledContainer } from "../../../../components/labeled-container/labeled-container";
import { ContainersTableView } from "../../../../components/containers-table/containers-table-view";
import { Link } from "react-router-dom";

interface Props {
    id: number;
}

interface State {
    Status: Abstractions.ItemStatus;
    Items?: Immutable.Map<string, ContainerDto>;
}

class AdministratorCollectorContainersContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [CollectorContainersMapStore];
    }

    public static calculateState(state: State, props: Props): State {
        const item = CollectorContainersMapStore.get(props.id.toString());

        return {
            Items: item.Value,
            Status: item.Status
        };
    }

    public renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <div>Loading</div>;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Items != null && this.state.Items.size !== 0) {
                    return <ContainersTableView items={this.state.Items} isAdministrator />;
                }
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>
                    No items found.
                </div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Failed to load list.</div>;
            }
        }
    }

    private renderControls(): JSX.Element[] {
        return [
            <Link
                key="add-container-button"
                className="btn btn-light"
                to={`/administrator/collector/${this.props.id}/add-container`}
            >
                Pridėti
            </Link>
        ];
    }

    public render(): JSX.Element {
        return <LabeledContainer
            title="Vežėjo konteineriai"
            className="administrator-collector-containers-container"
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
