import * as Immutable from "immutable";
import { Dispatcher } from "simplr-flux";
import { CollectorsActions } from "./collectors-actions";
import { CollectorDto } from "../../stores/collectors/collectors-contracts";

export namespace CollectorsActionsCreators {
    export function LoadRequired(): void {
        Dispatcher.dispatch(new CollectorsActions.LoadRequired);
    }

    export function ClearRequired(): void {
        Dispatcher.dispatch(new CollectorsActions.ClearRequired);
    }

    export function DataLoaded(items: Immutable.Map<string, CollectorDto>): void {
        Dispatcher.dispatch(new CollectorsActions.DataLoaded(items));
    }

    export function DataLoadFailed(): void {
        Dispatcher.dispatch(new CollectorsActions.DataLoadFailed);
    }
}
