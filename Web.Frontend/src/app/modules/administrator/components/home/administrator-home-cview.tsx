import * as React from "react";

import { InfoSection } from "../../../../components/info-box/info-section/info-section";
import { InfoBox } from "../../../../components/info-box/info-box";

import "./administrator-home-cview.css";

export class AdministratorHomeCView extends React.Component {
    public render(): JSX.Element {
        return <div className="administrator-home-cview">
            <InfoBox mainTitle="Pilnų konteinerių" mainValue="32">
                <InfoSection
                    primaryTitle="konteineriai"
                    primaryValue="62"
                    secondaryTitle="planuojama išvežti"
                    secondaryValue="13"
                />
                <InfoSection
                    primaryTitle="tuščių"
                    primaryValue="30"
                    secondaryTitle="neįtrauktų į keliones"
                    secondaryValue="19"
                />
            </InfoBox>
            <InfoBox mainTitle="Šiandien suplanuotos kelionės" mainValue="5">
                <InfoSection
                    primaryTitle="vežėjų"
                    primaryValue="12"
                    secondaryTitle="planuojama išvežti"
                    secondaryValue="13"
                />
                <InfoSection
                    primaryTitle="dirba šiandien"
                    primaryValue="3"
                    secondaryTitle="išvežti konteineriai"
                    secondaryValue="5"
                />
            </InfoBox>
            <InfoBox mainTitle="Aktyvių įrenginių" mainValue="60">
                <InfoSection
                    primaryTitle="iš viso"
                    primaryValue="62"
                    secondaryTitle="neaktyvūs"
                    secondaryValue="2"
                />
            </InfoBox>
        </div>;
    }
}
