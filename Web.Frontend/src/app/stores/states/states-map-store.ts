import { MapStore } from "simplr-flux";
import { ContainerState } from "./states-contracts";

type ItemsDictionary = { [key: string]: ContainerState };

class StatesMapStoreClass extends MapStore<ContainerState> {
    protected async requestData(keys: string[]): Promise<ItemsDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: ItemsDictionary = {};

        // TODO: implement.

        for (const key of keys) {
            // const promise = fetch(`https://jsonplaceholder.typicode.com/posts/${key}`)
            //     .then(data => data.json())
            //     .then((data: Post) => {
            //         postsDictionary[key] = data;
            //     });

            const promise = new Promise<void>(resolve => {
                setTimeout(() => {
                    const sampleItem: ContainerState = {
                        Id: Number(key),
                        ContainerId: 1,
                        Date: "2012-12-12",
                        ImagePath: "",
                        StateValueId: 1
                    };

                    itemsDictionary[key] = sampleItem;

                    resolve();
                });
            });

            promises.push(promise);
        }

        await Promise.all(promises);

        return itemsDictionary;
    }
}

export const StatesMapStore = new StatesMapStoreClass();
