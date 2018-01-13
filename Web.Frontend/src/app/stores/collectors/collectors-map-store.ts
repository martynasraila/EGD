import * as url from "url";
import { MapStore } from "simplr-flux";
import { CollectorDto } from "./collectors-contracts";
import { Configuration } from "../../configuration";

type CollectorsDictionary = { [key: string]: CollectorDto };

class CollectorsMapStoreClass extends MapStore<CollectorDto> {
    protected async requestData(keys: string[]): Promise<CollectorsDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: CollectorsDictionary = {};

        // TODO: implement.

        for (const key of keys) {
            const promise = new Promise<void>(async (resolve, reject) => {
                const path = url.resolve(Configuration.Api.Path, `api/collectors/${key}`);

                try {
                    const response = await window.fetch(path, {
                        method: "GET", headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        } as any
                    });

                    const data = await response.json() as CollectorDto;

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

export const CollectorsMapStore = new CollectorsMapStoreClass();
