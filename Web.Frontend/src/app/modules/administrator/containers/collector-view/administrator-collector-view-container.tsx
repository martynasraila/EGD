import * as React from "react";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";

import { CollectorsMapStore } from "../../../../stores/collectors/collectors-map-store";
import { CollectorDto } from "../../../../stores/collectors/collectors-contracts";
import { LabeledContainer } from "../../../../components/labeled-container/labeled-container";
import { AdministratorCollectorFormCView } from "../../components/collector-view/administrator-collector-form-cview";

interface Props {
    id: number;
}
interface State {
    Collector?: CollectorDto;
    Status: Abstractions.ItemStatus;
}

class AdministratorCollectorViewContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [CollectorsMapStore];
    }

    public static calculateState(state: State, props: Props): State {
        const item = CollectorsMapStore.get(props.id.toString());

        return {
            Collector: item.Value,
            Status: item.Status
        };
    }

    private renderStatuses(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <div>Kraunama...</div>;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Collector != null) {
                    return <AdministratorCollectorFormCView collector={this.state.Collector} />;
                }
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>Toks vežėjas nerastas.</div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Nepavyko užkrauti vežėjo informacijos.</div>;
            }
        }
    }

    public render(): JSX.Element {
        return <LabeledContainer title="Bendroji informacija" className="administrator-collector-view-container">
            {this.renderStatuses()}
        </LabeledContainer>;
    }
}

export const AdministratorCollectorViewContainer = Container.create(AdministratorCollectorViewContainerClass, { withProps: true });
