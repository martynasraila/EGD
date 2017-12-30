import * as React from "react";
import { AdministratorDeviceFormCView } from "./administrator-device-form-cview";

import "./administrator-device-create-cview.css";

export class AdministratorDeviceCreateCView extends React.Component {
    // TODO: implement.
    private onSubmit = () => {
        throw new Error("Not implemented");
    }

    public render(): JSX.Element {
        return <div className="administrator-device-create-cview">
            <AdministratorDeviceFormCView onSubmit={this.onSubmit} submitTitle="Pridėti" />
        </div>;
    }
}
