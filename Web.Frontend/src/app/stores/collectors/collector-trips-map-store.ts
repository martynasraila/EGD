import * as Immutable from "immutable";
import * as url from "url";
import { MapStore } from "simplr-flux";
import { Configuration } from "../../configuration";
import { CollectorTripDto } from "./collectors-contracts";

type CollectorTripsDictionary = { [key: string]: Immutable.List<CollectorTripDto> };

class CollectorTripsMapStoreClass extends MapStore<Immutable.List<CollectorTripDto>> {
    protected async requestData(keys: string[]): Promise<CollectorTripsDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: CollectorTripsDictionary = {};

        for (const key of keys) {
            const promise = new Promise<void>(async (resolve, reject) => {
                const path = url.resolve(Configuration.Api.Path, `Api/Collectors_Trips/ct/collector/${key}`);

                try {
                    const response = await window.fetch(path, {
                        method: "GET", headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        } as any
                    });

                    const data = await response.json() as CollectorTripDto[];

                    itemsDictionary[key] = Immutable.List<CollectorTripDto>(data);
                    resolve();
                } catch (error) {
                    console.error(error);
                    reject(error);
                }
            });

            promises.push(promise);
        }

        await Promise.all(promises);

        return itemsDictionary;
    }
}

export const CollectorTripsMapStore = new CollectorTripsMapStoreClass();
