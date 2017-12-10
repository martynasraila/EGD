import * as React from "react";

import "./info-box.css";

interface Props {
    mainTitle: string;
    mainValue: string;
}

export class InfoBox extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className="info-box">
            <div className="main-info">
                <div className="main-value">
                    {this.props.mainValue}
                </div>
                <div className="main-title">
                    {this.props.mainTitle}
                </div>
            </div>
            <div>
                {this.props.children}
            </div>
        </div>;
    }
}
