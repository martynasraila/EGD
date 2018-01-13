import * as Immutable from "immutable";
import * as url from "url";
import { MapStore } from "simplr-flux";
import { Configuration } from "../../configuration";
import { CollectorContainerDto } from "./collectors-contracts";

type CollectorContainersDictionary = { [key: string]: Immutable.List<CollectorContainerDto> };

class CollectorContainersMapStoreClass extends MapStore<Immutable.List<CollectorContainerDto>> {
    protected async requestData(keys: string[]): Promise<CollectorContainersDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: CollectorContainersDictionary = {};

        for (const key of keys) {
            const promise = new Promise<void>(async (resolve, reject) => {
                const path = url.resolve(Configuration.Api.Path, `Api/Collectors_Containers/cc/collector/${key}`);

                try {
                    const response = await window.fetch(path, {
                        method: "GET", headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        } as any
                    });

                    const data = await response.json() as CollectorContainerDto[];

                    itemsDictionary[key] = Immutable.List<CollectorContainerDto>(data);
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

export const CollectorContainersMapStore = new CollectorContainersMapStoreClass();
