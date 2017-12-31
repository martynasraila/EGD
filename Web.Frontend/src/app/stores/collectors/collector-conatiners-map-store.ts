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
                        Address: "Sample address",
                        Description: "Sample description",
                        EgdId: 1,
                        Id: 1,
                        LastStateId: 2,
                        Latitude: 12,
                        Longitude: 12
                    }).set("2", {
                        Address: "Sample address",
                        Description: "Sample description",
                        EgdId: 2,
                        Id: 2,
                        LastStateId: 2,
                        Latitude: 12,
                        Longitude: 12
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
