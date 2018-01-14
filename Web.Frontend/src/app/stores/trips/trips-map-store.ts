import * as url from "url";
import { MapStore } from "simplr-flux";

import { TripDto } from "./trips-contracts";
import { Configuration } from "../../configuration";

type TripsDictionary = { [key: string]: TripDto };

class TripsMapStoreClass extends MapStore<TripDto> {
    protected async requestData(keys: string[]): Promise<TripsDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: TripsDictionary = {};

        for (const key of keys) {
            const promise = new Promise<void>(async (resolve, reject) => {
                const path = url.resolve(Configuration.Api.Path, `Api/Trips/${key}`);

                try {
                    const response = await window.fetch(path, {
                        method: "GET", headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        } as any
                    });

                    const data = await response.json() as TripDto;

                    itemsDictionary[key] = data;
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

export const TripsMapStore = new TripsMapStoreClass();
