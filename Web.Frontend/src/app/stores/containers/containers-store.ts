import * as Immutable from "immutable";
import * as url from "url";
import { ReduceStore, ActionHandler, Abstractions } from "simplr-flux";

import { ContainerDto } from "./containers-contracts";
import { ContainersActions } from "../../actions/containers/containers-actions";
import { ContainersActionsCreators } from "../../actions/containers/containers-actions-creators";
import { Configuration } from "../../configuration";

export interface StoreState {
    Items: Immutable.Map<number, ContainerDto>;
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

    private async getData(): Promise<void> {
        const path = url.resolve(Configuration.Api.Path, "api/containers");

        try {
            const response = await window.fetch(path, {
                method: "GET", headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any
            });

            const itemsArray = await response.json() as ContainerDto[];

            const itemsMap = Immutable.Map<number, ContainerDto>().withMutations(mutator => {
                itemsArray.forEach(item => {
                    mutator.set(item.id, item);
                });
            });

            ContainersActionsCreators.DataLoaded(itemsMap);
        } catch (error) {
            console.error(error);
            ContainersActionsCreators.DataLoadFailed();
        }
    }

    private onLoadRequired: ActionHandler<ContainersActions.LoadRequired, StoreState> = (action, state) => {
        this.getData();

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

    public get Items(): Immutable.Map<number, ContainerDto> {
        return this.getState().Items;
    }

    public get Status(): Abstractions.ItemStatus {
        return this.getState().Status;
    }
}

export const ContainerStore = new ContainerStoreClass();
