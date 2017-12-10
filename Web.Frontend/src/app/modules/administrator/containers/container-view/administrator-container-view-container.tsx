import * as React from "react";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";
import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { ContainersMapStore } from "../../../../stores/containers/containers-map-store";

interface Props {
    id: number;
}

interface State {
    Container?: ContainerDto;
    Status: Abstractions.ItemStatus;
}

class AdministratorContainerViewContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [ContainersMapStore];
    }

    public static calculateState(state: State, props: Props): State {
        const item = ContainersMapStore.get(props.id.toString());
        return {
            Container: item.Value,
            Status: item.Status
        };
    }
}

export const AdministratorContainerViewContainer = Container.create(AdministratorContainerViewContainerClass, { withProps: true });
