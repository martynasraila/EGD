import * as React from "react";
import { SpinnerLoader } from "simplr-loaders";
import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";

import { StatisticsStore, Statistics } from "../../stores/statistics/statistics-store";
import { StatisticsView } from "../../components/statistics/statistics-view";

type State = Abstractions.Item<Statistics>;

class StatisticsContainerClass extends React.Component<{}, State> {
    public static getStores(): Container.StoresList {
        return [StatisticsStore];
    }

    public static calculateState(): State {
        return StatisticsStore.Statistics;
    }

    public render(): JSX.Element {
        switch (this.state.Status) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <SpinnerLoader />;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Value != null) {
                    return <StatisticsView statistics={this.state.Value} />;
                }
            }
            case Abstractions.ItemStatus.NoData: {
                return <div>
                    Nepavyko rasti duomenų.
                </div>;
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>
                    Nepavyko užkrauti duomenų.
                </div>;
            }
        }
    }
}

export const StatisticsContainer = Container.create(StatisticsContainerClass);
