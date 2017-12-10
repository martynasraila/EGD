import { MapStore } from "simplr-flux";
import { ContainerDto } from "./containers-contracts";

type ContainersDictionary = { [key: string]: ContainerDto };

class ContainersMapStoreClass extends MapStore<ContainerDto> {
    protected async requestData(keys: string[]): Promise<ContainersDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: ContainersDictionary = {};

        // TODO: implement.

        for (const key of keys) {
            // const promise = fetch(`https://jsonplaceholder.typicode.com/posts/${key}`)
            //     .then(data => data.json())
            //     .then((data: Post) => {
            //         postsDictionary[key] = data;
            //     });

            const promise = new Promise<void>(resolve => {
                setTimeout(() => {
                    const sampleContainer: ContainerDto = {
                        Address: "Sample address",
                        Description: "Sample description",
                        EgdId: 1,
                        Id: Number(key),
                        LastStateId: 2,
                        Latitude: 12,
                        Longitude: 12
                    };

                    itemsDictionary[key] = sampleContainer;

                    resolve();
                });
            });

            promises.push(promise);
        }

        await Promise.all(promises);

        return itemsDictionary;
    }
}

export const ContainersMapStore = new ContainersMapStoreClass();
