import * as React from "react";
import * as classNames from "classnames";

import "./hidden-string.css";

interface Props {
    text: string;
    className?: string;
}

interface State {
    IsHidden: boolean;
}

export class HiddenString extends React.Component<Props, State> {
    public state: State = {
        IsHidden: true
    };

    private onEyeClick: React.MouseEventHandler<HTMLElement> = () => {
        this.setState(state => (
            {
                IsHidden: !state.IsHidden
            } as State)
        );
    }

    public render(): JSX.Element {
        let visualString;

        if (this.state.IsHidden) {
            visualString = "";
            for (let i = 0; i < this.props.text.length; i++) {
                visualString += "*";
            }
        } else {
            visualString = this.props.text;
        }

        return <div className={classNames("hidden-string", this.props.className)}>
            <div className="visual-string">{visualString}</div>
            <div className="eye-button" onClick={this.onEyeClick}>
                <i className={this.state.IsHidden ? "fa fa-eye" : "fa fa-eye-slash"}></i>
            </div>
        </div>;
    }
}
