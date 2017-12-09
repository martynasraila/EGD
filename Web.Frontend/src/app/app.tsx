import * as React from "react";
import * as ReactDOM from "react-dom";

class App {
    constructor() {
        this.startApp();
    }

    private startApp() {
        let appRoot = document.getElementById("app-root");
        if (appRoot != null) {
            ReactDOM.render(<div>Hello world</div>, appRoot);
        } else {
            this.generateAppRootElement();
        }
    }

    private generateAppRootElement() {
        let newRoot = document.createElement("div");
        newRoot.id = "app-root";
        document.body.appendChild(newRoot);
        this.startApp();
    }
}

new App();
