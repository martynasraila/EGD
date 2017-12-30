import * as React from "react";
import * as Immutable from "immutable";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";
import { Link } from "react-router-dom";

import { CollectorsStore } from "../../../../stores/collectors/collectors-store";
import { CollectorsActionsCreators } from "../../../../actions/collectors/collectors-actions-creators";
import { AdministratorCollectorsCView } from "../../components/collectors/administrator-collectors-cview";
import { CollectorDto } from "../../../../stores/collectors/collectors-contracts";

import "./administrator-collectors-container.css";

interface State {
    Status: Abstractions.ItemStatus;
    Items: Immutable.Map<string, CollectorDto>;
}

class AdministratorCollectorsContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [CollectorsStore];
    }

    public static calculateState(state: State): State {
        const status = CollectorsStore.Status;
        if (status === Abstractions.ItemStatus.Init) {
            setTimeout(() => CollectorsActionsCreators.LoadRequired());
        }

        return {
            Items: CollectorsStore.Items,
            Status: CollectorsStore.Status
        };
    }

    public renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <div>Loading</div>;
            }
            case Abstractions.ItemStatus.Loaded: {
                return <AdministratorCollectorsCView items={this.state.Items} />;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Failed to load list.</div>;
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>
                    No items found.
                </div>;
            }
        }
    }

    public render(): JSX.Element {
        return <div className="administrator-collectors-container">
            <div className="controls-section">
                <Link className="btn btn-light" to="/administrator/collector/create">Pridėti naują</Link>
            </div>
            {this.renderStatuses()}
        </div>;
    }
}

export const AdministratorCollectorsContainer = Container.create(AdministratorCollectorsContainerClass);
