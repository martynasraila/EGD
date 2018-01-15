import * as React from "react";
import * as url from "url";

import { Container } from "flux/utils";
import { Abstractions } from "simplr-flux";
import { ContainerDto } from "../../../../stores/containers/containers-contracts";
import { ContainersMapStore } from "../../../../stores/containers/containers-map-store";
import { DevicesMapStore } from "../../../../stores/devices/devices-map-store";
import { DeviceDto } from "../../../../stores/devices/devices-contracts";
import { LabeledContainer } from "../../../../components/labeled-container/labeled-container";
import { AdministratorDeviceFormCView } from "../../components/devices/administrator-device-form-cview";
import { Link } from "react-router-dom";
import { FormOnSubmitCallback } from "@simplr/react-forms-dom/contracts";
import { Configuration } from "../../../../configuration";

interface Props {
    containerId?: number;
}

interface State {
    Container?: ContainerDto;
    Status: Abstractions.ItemStatus;
    Device?: DeviceDto;
    DeviceStatus: Abstractions.ItemStatus;
}

class AdministratorDeviceViewContainerClass extends React.Component<Props, State> {
    public static getStores(): Container.StoresList {
        return [ContainersMapStore, DevicesMapStore];
    }

    public static calculateState(state: State, props: Props): State {
        if (props.containerId == null) {
            return {
                Status: Abstractions.ItemStatus.NoData,
                DeviceStatus: Abstractions.ItemStatus.NoData
            };
        }

        const item = ContainersMapStore.get(props.containerId.toString());

        if (item.Value == null) {
            return {
                Container: item.Value,
                Status: item.Status,
                DeviceStatus: Abstractions.ItemStatus.Init,
                Device: undefined
            };
        }

        if (item.Value.egDid == null) {
            return {
                Container: item.Value,
                Status: item.Status,
                DeviceStatus: Abstractions.ItemStatus.NoData,
                Device: undefined
            };
        }

        const deviceItem = DevicesMapStore.get(item.Value.egDid.toString());

        return {
            Container: item.Value,
            Status: item.Status,
            DeviceStatus: deviceItem.Status,
            Device: deviceItem.Value
        };
    }

    private onDeviceSubmit: FormOnSubmitCallback = async (event, store) => {
        const submitData = store.ToObject();

        const path = url.resolve(Configuration.Api.Path, "api/EGD");

        try {
            await window.fetch(path, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                } as any,
                body: JSON.stringify({
                    ...this.state.Device,
                    ...submitData
                })
            });

            if (this.state.Device != null) {
                DevicesMapStore.InvalidateCache(this.state.Device.id.toString());
            }

        } catch (error) {
            console.error(error);
            alert("Nepavyko išsaugoti pakeitimų.");
        }
    }

    private renderStatuses(): JSX.Element {
        switch (this.state.DeviceStatus) {
            case Abstractions.ItemStatus.Init:
            case Abstractions.ItemStatus.Pending: {
                return <div>Kraunama...</div>;
            }
            case Abstractions.ItemStatus.Loaded: {
                if (this.state.Device != null) {
                    return <AdministratorDeviceFormCView
                        device={this.state.Device}
                        submitTitle="Išsaugoti"
                        onSubmit={this.onDeviceSubmit}
                    />;
                }
            }
            case Abstractions.ItemStatus.NoData: {
                if (this.state.Container != null) {
                    return <div>
                        <Link
                            className="btn btn-light"
                            to={`/administrator/container/${this.state.Container.id}/device/create`}
                        >
                            Pridėti įrenginį
                        </Link>
                    </div>;
                } else {
                    return <div>Nepavyko rasti konteinerio.</div>;
                }
            }
            case Abstractions.ItemStatus.Failed: {
                return <div>Nepavyko užkrauti įrenginio informacijos.</div>;
            }
        }
    }

    public render(): JSX.Element {
        const deviceIdString = this.state.Container && this.state.Container.egDid ? ` (${this.state.Container.egDid})` : "";

        return <LabeledContainer title={`Įrenginys ${deviceIdString}`} className="administrator-device-view-container">
            {this.renderStatuses()}
        </LabeledContainer>;
    }
}

export const AdministratorDeviceViewContainer = Container.create(AdministratorDeviceViewContainerClass, { withProps: true });
