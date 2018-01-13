import * as url from "url";
import { MapStore } from "simplr-flux";
import { DeviceDto } from "./devices-contracts";
import { Configuration } from "../../configuration";

type ItemsDictionary = { [key: string]: DeviceDto };

class DevicesMapStoreClass extends MapStore<DeviceDto> {
    protected async requestData(keys: string[]): Promise<ItemsDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: ItemsDictionary = {};

        for (const key of keys) {
            const promise = new Promise<void>(async (resolve, reject) => {
                const path = url.resolve(Configuration.Api.Path, `api/egd/${key}`);

                try {
                    const response = await window.fetch(path, {
                        method: "GET", headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        } as any
                    });

                    const data = await response.json() as DeviceDto;

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

export const DevicesMapStore = new DevicesMapStoreClass();
