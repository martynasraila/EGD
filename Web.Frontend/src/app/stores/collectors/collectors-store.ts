import * as Immutable from "immutable";
import { Abstractions, ReduceStore, ActionHandler } from "simplr-flux";

import { CollectorDto } from "./collectors-contracts";
import { CollectorsActions } from "../../actions/collectors/collectors-actions";
import { CollectorsActionsCreators } from "../../actions/collectors/collectors-actions-creators";

export interface StoreState {
    Items: Immutable.Map<string, CollectorDto>;
    Status: Abstractions.ItemStatus;
}

class CollectorsStoreClass extends ReduceStore<StoreState> {
    constructor() {
        super();
        this.registerAction(CollectorsActions.LoadRequired, this.onLoadRequired);
        this.registerAction(CollectorsActions.ClearRequired, this.cleanUpStore.bind(this));
        this.registerAction(CollectorsActions.DataLoaded, this.onDataLoaded);
        this.registerAction(CollectorsActions.DataLoadFailed, this.onDataLoadFailed);
    }

    private onLoadRequired: ActionHandler<CollectorsActions.LoadRequired, StoreState> = (action, state) => {
        setTimeout(() => {
            const sampleData: { [key: number]: CollectorDto } = {
                1: {
                    Id: 1,
                    Title: "Sample title #1.",
                    Description: "Some description about collector.",
                    PasswordHash: "027bd14fb78fd9ca8ef115c6136f1d7b3a810af2c5082c3616b6797467179887",
                    UserName: "collector1"
                },
                2: {
                    Id: 2,
                    Title: "Sample title #2.",
                    Description: "Some description about collector.",
                    PasswordHash: "027bd14fb78fd9ca8ef115c6136f1d7b3a810af2c5082c3616b6797467179887",
                    UserName: "collector2"
                }
            };

            CollectorsActionsCreators.DataLoaded(Immutable.Map(sampleData));
        }, 100);

        return {
            ...state,
            Status: Abstractions.ItemStatus.Pending
        };
    }

    private onDataLoaded: ActionHandler<CollectorsActions.DataLoaded, StoreState> = (action, state) =>
        ({
            ...state,
            Items: action.Items,
            Status: Abstractions.ItemStatus.Loaded
        })

    private onDataLoadFailed: ActionHandler<CollectorsActions.DataLoadFailed, StoreState> = (action, state) =>
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

    public get Items(): Immutable.Map<string, CollectorDto> {
        return this.getState().Items;
    }

    public get Status(): Abstractions.ItemStatus {
        return this.getState().Status;
    }
}

export const CollectorsStore = new CollectorsStoreClass();
