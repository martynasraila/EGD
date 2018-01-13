import * as React from "react";

import { Statistics } from "../../stores/statistics/statistics-store";
import { InfoBox } from "../info-box/info-box";
import { InfoSection } from "../info-box/info-section/info-section";

import "./statistics-view.css";

interface Props {
    statistics: Statistics;
}

export class StatisticsView extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="statistics-view">
            <InfoBox mainTitle="Pilnų konteinerių" mainValue={this.props.statistics.fullContainerCount.toString()}>
                <InfoSection
                    primaryTitle="konteineriai"
                    primaryValue={this.props.statistics.containerCount.toString()}
                    secondaryTitle="tuščių"
                    secondaryValue={this.props.statistics.emptyContainers.toString()}
                />
            </InfoBox>
            <InfoBox mainTitle="Šiandien suplanuotos kelionės" mainValue={this.props.statistics.todaysTrips.toString()}>
                <InfoSection
                    primaryTitle="vežėjų"
                    primaryValue={this.props.statistics.collectorsCount.toString()}
                    secondaryTitle="dirba šiandien"
                    secondaryValue={this.props.statistics.worksToday.toString()}
                />
            </InfoBox>
            <InfoBox mainTitle="Aktyvių įrenginių" mainValue={this.props.statistics.activeEGD.toString()}>
                <InfoSection
                    primaryTitle="iš viso"
                    primaryValue={this.props.statistics.egdCount.toString()}
                    secondaryTitle="neaktyvūs"
                    secondaryValue={this.props.statistics.inActiveEGD.toString()}
                />
            </InfoBox>
        </div>;
    }
}
