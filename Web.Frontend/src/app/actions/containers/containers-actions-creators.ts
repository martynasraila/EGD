import * as Immutable from "immutable";
import { Dispatcher } from "simplr-flux";
import { ContainersActions } from "./containers-actions";
import { ContainerDto } from "../../stores/containers/containers-contracts";

export namespace ContainersActionsCreators {
    export function LoadRequired(): void {
        Dispatcher.dispatch(new ContainersActions.LoadRequired);
    }

    export function ClearRequired(): void {
        Dispatcher.dispatch(new ContainersActions.ClearRequired);
    }

    export function DataLoaded(items: Immutable.Map<string, ContainerDto>): void {
        Dispatcher.dispatch(new ContainersActions.DataLoaded(items));
    }

    export function DataLoadFailed(): void {
        Dispatcher.dispatch(new ContainersActions.DataLoadFailed);
    }
}
