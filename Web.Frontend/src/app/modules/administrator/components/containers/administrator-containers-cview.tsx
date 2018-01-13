import * as React from "react";
import * as Immutable from "immutable";

import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { ContainersTableView } from "../../../../components/containers-table/containers-table-view";

interface Props {
    items: Immutable.Map<number, ContainerDto>;
}

export class AdministratorContainersCView extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="administrator-containers-cview">
            <ContainersTableView items={this.props.items} isAdministrator />
        </div>;
    }
}
