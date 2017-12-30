import * as React from "react";
import * as classNames from "classnames";

import "./labeled-container.css";

interface Props {
    title: string;
    className?: string;
}

export class LabeledContainer extends React.Component<Props> {
    public render(): JSX.Element {
        return <div className={classNames("labeled-container", this.props.className)}>
            <h1>{this.props.title}</h1>
            <div>{this.props.children}</div>
        </div>;
    }
}
