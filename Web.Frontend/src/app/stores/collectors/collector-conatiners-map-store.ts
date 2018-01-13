import * as Immutable from "immutable";
import { MapStore } from "simplr-flux";
import { ContainerDto } from "../containers/containers-contracts";

type CollectorContainersDictionary = { [key: string]: Immutable.Map<string, ContainerDto> };

class CollectorContainersMapStoreClass extends MapStore<Immutable.Map<string, ContainerDto>> {
    protected async requestData(keys: string[]): Promise<CollectorContainersDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: CollectorContainersDictionary = {};

        // TODO: implement.

        for (const key of keys) {
            // const promise = fetch(`https://jsonplaceholder.typicode.com/posts/${key}`)
            //     .then(data => data.json())
            //     .then((data: Post) => {
            //         postsDictionary[key] = data;
            //     });

            const promise = new Promise<void>(resolve => {
                setTimeout(() => {
                    const sampleMap = Immutable.Map<string, ContainerDto>().set("1", {
                        address: "Sample address",
                        description: "Sample description",
                        egdId: 1,
                        id: 1,
                        lastStateId: 2,
                        latitude: 12,
                        longitude: 12
                    }).set("2", {
                        address: "Sample address",
                        description: "Sample description",
                        egdId: 2,
                        id: 2,
                        lastStateId: 2,
                        latitude: 12,
                        longitude: 12
                    });

                    itemsDictionary[key] = sampleMap;

                    resolve();
                });
            });

            promises.push(promise);
        }

        await Promise.all(promises);

        return itemsDictionary;
    }
}

export const CollectorContainersMapStore = new CollectorContainersMapStoreClass();
