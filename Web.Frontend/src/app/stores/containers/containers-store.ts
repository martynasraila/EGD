import * as Immutable from "immutable";
import { ReduceStore, ActionHandler, Abstractions } from "simplr-flux";
import { ContainerDto } from "./containers-contracts";
import { ContainersActions } from "../../actions/containers/containers-actions";
import { ContainersActionsCreators } from "../../actions/containers/containers-actions-creators";

export interface StoreState {
    Items: Immutable.Map<string, ContainerDto>;
    Status: Abstractions.ItemStatus;
}

class ContainerStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(ContainersActions.LoadRequired, this.onLoadRequired);
        this.registerAction(ContainersActions.ClearRequired, this.cleanUpStore.bind(this));
        this.registerAction(ContainersActions.DataLoaded, this.onDataLoaded);
        this.registerAction(ContainersActions.DataLoadFailed, this.onDataLoadFailed);
    }

    private onLoadRequired: ActionHandler<ContainersActions.LoadRequired, StoreState> = (action, state) => {
        setTimeout(() => {
            const sampleData: { [key: number]: ContainerDto } = {
                1: {
                    Address: "Sample address",
                    Description: "Sample description",
                    EgdId: 1,
                    Id: 1,
                    LastStateId: 2,
                    Latitude: 12,
                    Longitude: 12
                },
                2: {
                    Address: "Sample address",
                    Description: "Sample description",
                    EgdId: 2,
                    Id: 2,
                    LastStateId: 2,
                    Latitude: 12,
                    Longitude: 12
                }
            };

            ContainersActionsCreators.DataLoaded(Immutable.Map(sampleData));
        }, 100);

        return {
            ...state,
            Status: Abstractions.ItemStatus.Pending
        };
    }

    private onDataLoaded: ActionHandler<ContainersActions.DataLoaded, StoreState> = (action, state) =>
        ({
            ...state,
            Items: action.Items,
            Status: Abstractions.ItemStatus.Loaded
        })

    private onDataLoadFailed: ActionHandler<ContainersActions.DataLoadFailed, StoreState> = (action, state) =>
        ({
            ...state,
            Status: Abstractions.ItemStatus.Failed
        })

    public getInitialState(): StoreState {
        return {
            Items: Immutable.Map(),
            Status: Abstractions.ItemStatus.Init
        };
    }

    public get Items(): Immutable.Map<string, ContainerDto> {
        return this.getState().Items;
    }

    public get Status(): Abstractions.ItemStatus {
        return this.getState().Status;
    }
}

export const ContainerStore = new ContainerStoreClass();
