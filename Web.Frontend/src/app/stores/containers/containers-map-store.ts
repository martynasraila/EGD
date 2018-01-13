import * as url from "url";

import { MapStore } from "simplr-flux";
import { ContainerDto } from "./containers-contracts";
import { Configuration } from "../../configuration";

type ContainersDictionary = { [key: string]: ContainerDto };

class ContainersMapStoreClass extends MapStore<ContainerDto> {
    protected async requestData(keys: string[]): Promise<ContainersDictionary> {
        const promises: Array<Promise<void>> = [];
        const itemsDictionary: ContainersDictionary = {};

        for (const key of keys) {
            const promise = new Promise<void>(async (resolve, reject) => {
                const path = url.resolve(Configuration.Api.Path, `api/containers/${key}`);

                try {
                    const response = await window.fetch(path, {
                        method: "GET", headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        } as any
                    });

                    const data = await response.json() as ContainerDto;

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

export const ContainersMapStore = new ContainersMapStoreClass();
