import * as React from "react";
import * as classNames from "classnames";

import "./labeled-container.css";

interface Props {
    title: string;
    className?: string;
    controls?: JSX.Element[];
}

export class LabeledContainer extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className={classNames("labeled-container", this.props.className)}>
            <div className="header">
                <div className="title">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="controls">
                    {this.props.controls}
                </div>
            </div>
            <div>{this.props.children}</div>
        </div>;
    }
}
