import * as url from "url";
import { DataStore, Abstractions } from "simplr-flux";
import { Configuration } from "../../configuration";

export interface Statistics {
    containerCount: 3;
    egdCount: 3;
    activeEGD: 2;
    inActiveEGD: 1;
    fullContainerCount: 1;
    emptyContainers: 1;
    todaysTrips: 0;
    collectorsCount: 2;
    worksToday: 0;
}

const STATISTICS_KEY = "statistics";

class StatisticsStoreClass extends DataStore {
    private async getStatistics(): Promise<Statistics> {
        const path = url.resolve(Configuration.Api.Path, "api/containers/stats");

        try {
            const response = await window.fetch(path, {
                method: "POST", headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any
            });

            const statisticsArray = await response.json() as Statistics[];
            return statisticsArray[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public get Statistics(): Abstractions.Item<Statistics> {
        return this.getValueFromState<Statistics>(STATISTICS_KEY, this.getStatistics);
    }

    public InvalidatePersonalData(): void {
        this.invalidateCache(STATISTICS_KEY);
    }
}

export const StatisticsStore = new StatisticsStoreClass();
