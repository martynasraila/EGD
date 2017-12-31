import { MapStore } from "simplr-flux";
import { CollectorDto } from "./collectors-contracts";

type CollectorsDictionary = { [key: string]: CollectorDto };

class CollectorsMapStoreClass extends MapStore<CollectorDto> {
    protected async requestData(keys: string[]): Promise<CollectorsDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: CollectorsDictionary = {};

        // TODO: implement.

        for (const key of keys) {
            // const promise = fetch(`https://jsonplaceholder.typicode.com/posts/${key}`)
            //     .then(data => data.json())
            //     .then((data: Post) => {
            //         postsDictionary[key] = data;
            //     });

            const promise = new Promise<void>(resolve => {
                setTimeout(() => {
                    const sampleItem: CollectorDto = {
                        Id: 1,
                        Title: "Sample title #1.",
                        Description: "Some description about collector.",
                        PasswordHash: "027bd14fb78fd9ca8ef115c6136f1d7b3a810af2c5082c3616b6797467179887",
                        UserName: "collector1"
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

export const CollectorsMapStore = new CollectorsMapStoreClass();
