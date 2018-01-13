import * as React from "react";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";
import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { ContainersMapStore } from "../../../../stores/containers/containers-map-store";
import { LabeledContainer } from "../../../../components/labeled-container/labeled-container";
import { StatesMapStore } from "../../../../stores/states/states-map-store";
import { ContainerState } from "../../../../stores/states/states-contracts";
import { AdministratorContainerFormCView } from "../../components/containers/administrator-container-form-cview";

interface Props {
    id: number;
}

interface State {
    Container?: ContainerDto;
    Status: Abstractions.ItemStatus;
    LastState?: ContainerState;
}

class AdministratorContainerViewContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [ContainersMapStore, StatesMapStore];
    }

    public static calculateState(state: State, props: Props): State {
        const item = ContainersMapStore.get(props.id.toString());

        if (item.Value == null || item.Value.egDid == null) {
            return {
                Container: item.Value,
                Status: item.Status,
                LastState: undefined
            };
        }

        const lastStateId = item.Value.lastStateid;
        const lastStateItem = (lastStateId) ? StatesMapStore.get(lastStateId.toString()).Value : undefined;

        return {
            Container: item.Value,
            Status: item.Status,
            LastState: lastStateItem
        };
    }

    private renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <div>Kraunama</div>;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Container != null) {
                    return <AdministratorContainerFormCView container={this.state.Container} lastState={this.state.LastState} />;
                }
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>Toks konteineris nerastas.</div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Nepavyko užkrauti konteinerio.</div>;
            }
        }
    }

    public render(): JSX.Element {
        return <LabeledContainer title="Bendroji informacija" className="administrator-container-view-container">
            {this.renderStatuses()}
        </LabeledContainer>;
    }
}

export const AdministratorContainerViewContainer = Container.create(AdministratorContainerViewContainerClass, { withProps: true });
