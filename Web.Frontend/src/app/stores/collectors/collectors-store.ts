import * as Immutable from "immutable";
import * as url from "url";
import { Abstractions, ReduceStore, ActionHandler } from "simplr-flux";

import { CollectorDto } from "./collectors-contracts";
import { CollectorsActions } from "../../actions/collectors/collectors-actions";
import { CollectorsActionsCreators } from "../../actions/collectors/collectors-actions-creators";
import { Configuration } from "../../configuration";

export interface StoreState {
    Items: Immutable.Map<number, CollectorDto>;
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

    private async getData(): Promise<void> {
        const path = url.resolve(Configuration.Api.Path, "api/collectors");

        try {
            const response = await window.fetch(path, {
                method: "GET", headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any
            });

            const itemsArray = await response.json() as CollectorDto[];

            const itemsMap = Immutable.Map<number, CollectorDto>().withMutations(mutator => {
                itemsArray.forEach(item => {
                    mutator.set(item.id, item);
                });
            });

            CollectorsActionsCreators.DataLoaded(itemsMap);
        } catch (error) {
            console.error(error);
            CollectorsActionsCreators.DataLoadFailed();
        }
    }

    private onLoadRequired: ActionHandler<CollectorsActions.LoadRequired, StoreState> = (action, state) => {
        this.getData();

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

    public get Items(): Immutable.Map<number, CollectorDto> {
        return this.getState().Items;
    }

    public get Status(): Abstractions.ItemStatus {
        return this.getState().Status;
    }
}

export const CollectorsStore = new CollectorsStoreClass();
