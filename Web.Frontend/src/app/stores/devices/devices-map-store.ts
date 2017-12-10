import { MapStore } from "simplr-flux";
import { DeviceDto } from "./devices-contracts";

type ItemsDictionary = { [key: string]: DeviceDto };

class DevicesMapStoreClass extends MapStore<DeviceDto> {
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
                    const sampleItem: DeviceDto = {
                        Id: Number(key),
                        ConfigurationStreak: 5,
                        PaddingBottom: 10,
                        PaddingLeft: 10,
                        PaddingRight: 10,
                        PaddingTop: 10,
                        PhotoStreak: 5
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

export const DevicesMapStore = new DevicesMapStoreClass();
