import * as Immutable from "immutable";
import { ContainerDto } from "../../stores/containers/containers-contracts";

export namespace ContainersActions {
    export class LoadRequired { }
    export class ClearRequired { }
    export class DataLoaded {
        constructor(private items: Immutable.Map<string, ContainerDto>) { }

        public get Items(): Immutable.Map<string, ContainerDto> {
            return this.items;
        }
    }

    export class DataLoadFailed { }
}
