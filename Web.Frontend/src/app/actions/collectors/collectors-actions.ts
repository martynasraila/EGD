import * as Immutable from "immutable";
import { CollectorDto } from "../../stores/collectors/collectors-contracts";

export namespace CollectorsActions {
    export class LoadRequired { }
    export class ClearRequired { }
    export class DataLoaded {
        constructor(private items: Immutable.Map<number, CollectorDto>) { }

        public get Items(): Immutable.Map<number, CollectorDto> {
            return this.items;
        }
    }

    export class DataLoadFailed { }
}
