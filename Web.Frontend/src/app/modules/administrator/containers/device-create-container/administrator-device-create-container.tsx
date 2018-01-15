import * as React from "react";
import { Container } from "flux/utils";
import { ContainersMapStore } from "../../../../stores/containers/containers-map-store";
import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { Abstractions } from "simplr-flux";
import { SpinnerLoader } from "simplr-loaders";
import { AdministratorDeviceCreateCView } from "../../components/devices/administrator-device-create-cview";

interface Props {
    containerId: number;
}

interface State {
    Container?: ContainerDto;
    Status: Abstractions.ItemStatus;
}

class AdministratorDeviceCreateContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [ContainersMapStore];
    }

    public static calculateState(state: State, props: Props): State {
        const item = ContainersMapStore.get(props.containerId.toString());

        return {
            Container: item.Value,
            Status: item.Status
        };
    }

    public render(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <SpinnerLoader />;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Container) {
                    return <AdministratorDeviceCreateCView container={this.state.Container} />;
                }
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>Nepavyko rasti konteinerio.</div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Nepavyko užkrauti konteinerio.</div>;
            }
        }
    }

}

export const AdministratorDeviceCreateContainer = Container.create(AdministratorDeviceCreateContainerClass, { withProps: true });
