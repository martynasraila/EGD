import * as React from "react";

import "./info-section.css";

interface Props {
    primaryTitle: string;
    primaryValue: string;
    secondaryTitle: string;
    secondaryValue: string;
}

export class InfoSection extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="info-section">
            <div>{`${this.props.primaryValue} ${this.props.primaryTitle}`}</div>
            <div>{`${this.props.secondaryValue} ${this.props.secondaryTitle}`}</div>
        </div>;
    }
}
