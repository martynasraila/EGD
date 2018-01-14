import * as Immutable from "immutable";
import * as url from "url";
import { MapStore } from "simplr-flux";
import { Configuration } from "../../configuration";
import { TripContainersDto } from "./trips-contracts";

type TripContainersDictionary = { [key: string]: Immutable.List<TripContainersDto> };

class TripContainersMapStoreClass extends MapStore<Immutable.List<TripContainersDto>> {
    protected async requestData(keys: string[]): Promise<TripContainersDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: TripContainersDictionary = {};

        for (const key of keys) {
            const promise = new Promise<void>(async (resolve, reject) => {
                const path = url.resolve(Configuration.Api.Path, `Api/Trips_Containers/tc/trip/${key}`);

                try {
                    const response = await window.fetch(path, {
                        method: "GET", headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        } as any
                    });

                    const data = await response.json() as TripContainersDto[];

                    itemsDictionary[key] = Immutable.List<TripContainersDto>(data);
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

export const TripContainersMapStore = new TripContainersMapStoreClass();
