import * as React from "react";
import * as Immutable from "immutable";
import * as classNames from "classnames";
import * as url from "url";

import { TripContainerExtendedDto } from "../../../containers/trip-selector/collector-trip-selector-container";
import { ActionEmitter } from "../../../../../helpers/action-emitter";
import { Configuration } from "../../../../../configuration";

import { TripContainersDto } from "../../../../../stores/trips/trips-contracts";
import { TripContainersMapStore } from "../../../../../stores/trips/trip-containers-map-store";

import "./collector-trip-selector-cview.css";

interface Props {
    tripId: number;
    items: Immutable.Map<string, TripContainerExtendedDto>;
    disabled: boolean;
}

interface State {
    // containerId, priority.
    ItemsMap: Immutable.Map<number, number>;
    Disabled: boolean;
}

export class SaveTripPrioritiesAction { }

export class CollectorTripSelectorCView extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        ActionEmitter.addListener(SaveTripPrioritiesAction, this.onSubmitPriorities);

        let itemsMap = Immutable.Map<number, number>();

        props.items.forEach(item => {
            if (item != null) {
                itemsMap = itemsMap.set(item!.id, item!.containerPriority);
            }
        });

        this.state = {
            ItemsMap: itemsMap,
            Disabled: props.disabled
        };
    }

    private async submitPriorities(): Promise<void> {
        this.setState(state =>
            ({
                ItemsMap: state.ItemsMap,
                Disabled: true
            } as State));

        const path = url.resolve(Configuration.Api.Path, "Api/Trips_Containers/tc/priority");

        try {
            const promisesArray = this.state.ItemsMap.map((value, key) =>
                window.fetch(path, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    } as any,
                    body: JSON.stringify({
                        containerId: key,
                        containerPriority: value,
                        tripId: this.props.tripId
                    } as TripContainersDto)
                })).toArray();

            await Promise.all(promisesArray);

            TripContainersMapStore.InvalidateCache(this.props.tripId.toString());
            alert("Pakeitimai išsaugoti.");
        } catch (error) {
            console.error(error);
            alert("Nepavyko išsaugoti pakeitimų.");
        }

        this.setState(state =>
            ({
                ItemsMap: state.ItemsMap,
                Disabled: this.props.disabled
            } as State));
    }

    private onSubmitPriorities = () => {
        this.submitPriorities();
    }

    private onUpClick = (item: TripContainerExtendedDto, disable: boolean) => {
        if (disable || this.state.Disabled) {
            return;
        }

        this.setState(state => {
            const currentPriority = this.state.ItemsMap.get(item.id);
            const nextPriority = currentPriority - 1;

            const itemWithNextPriorityKey = this.state.ItemsMap.findKey(itemKey => itemKey === nextPriority);
            const updatedMap = state.ItemsMap
                .set(itemWithNextPriorityKey, currentPriority)
                .set(item.id, nextPriority).toMap();

            return {
                ItemsMap: updatedMap
            };
        });
    }

    private onDownClick = (item: TripContainerExtendedDto, disabled: boolean) => {
        if (disabled || this.state.Disabled) {
            return;
        }

        this.setState(state => {
            const currentPriority = this.state.ItemsMap.get(item.id);
            const nextPriority = currentPriority + 1;

            const itemWithNextPriorityKey = this.state.ItemsMap.findKey(itemKey => itemKey === nextPriority);

            const updatedMap = state.ItemsMap
                .set(itemWithNextPriorityKey, currentPriority)
                .set(item.id, nextPriority).toMap();

            return {
                ItemsMap: updatedMap
            };
        });
    }

    public render(): JSX.Element {
        let containerIndex: number = 0;
        const lastIndex = this.props.items.size - 1;

        const sortedMap = this.state.ItemsMap.sort((a: number, b: number) => {
            if (a === b) {
                return 0;
            }

            if (a < b) {
                return -1;
            }

            return 1;
        }).toMap();

        return <table className="collector-trip-selector-cview table">
            <thead>
                <tr>
                    <th></th>
                    <th>Prioritetas</th>
                    <th>Konteinerio Id</th>
                    <th>Aprašymas</th>
                    <th>Adresas</th>
                    <th>Koordinatės</th>
                </tr>
            </thead>
            <tbody>
                {sortedMap.map((currentPriority, itemKey) => {
                    if (itemKey == null) {
                        return null;
                    }

                    const item = this.props.items.get(itemKey.toString());

                    const disabledUp = containerIndex === 0 || this.state.Disabled;
                    const disabledDown = containerIndex === lastIndex || this.state.Disabled;

                    const result = <tr key={`table-key-${item.id}`}>
                        <th className="controls-row">
                            <div
                                onClick={() => { this.onUpClick(item, disabledUp); }}
                                className={classNames("trip-control", { "disabled": disabledUp })}
                            >
                                <i className="fa fa-arrow-circle-o-up" ></i>
                            </div>
                            <div
                                onClick={() => { this.onDownClick(item, disabledDown); }}
                                className={classNames("trip-control", { "disabled": disabledDown })}
                            >
                                <i className="fa fa-arrow-circle-o-down" ></i>
                            </div>
                        </th>
                        <th>
                            {currentPriority}
                        </th>
                        <th>{item.id}</th>
                        <th>{item.description}</th>
                        <th>{item.address}</th>
                        <th>{`${item.longitude}, ${item.latitude}`}</th>
                    </tr>;

                    containerIndex++;
                    return result;
                })
                    .toArray()}
            </tbody>
        </table>;
    }
}
