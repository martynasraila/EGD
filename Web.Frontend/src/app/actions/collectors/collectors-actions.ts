import * as Immutable from "immutable";
import { CollectorDto } from "../../stores/collectors/collectors-contracts";

export namespace CollectorsActions {
    export class LoadRequired { }
    export class ClearRequired { }
    export class DataLoaded {
        constructor(private items: Immutable.Map<string, CollectorDto>) { }

        public get Items(): Immutable.Map<string, CollectorDto> {
            return this.items;
        }
    }

    export class DataLoadFailed { }
}
