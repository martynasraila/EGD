import * as ReactDOM from "react-dom";

import { Router } from "./routes";

import "./reset.css";
import "./app.css";

class App {
    constructor() {
        this.startApp();
    }

    private startApp(): void {
        const appRoot = document.getElementById("app-root");
        if (appRoot != null) {
            ReactDOM.render(Router, appRoot);
        } else {
            this.generateAppRootElement();
        }
    }

    private generateAppRootElement(): void {
        const newRoot = document.createElement("div");
        newRoot.id = "app-root";
        document.body.appendChild(newRoot);
        this.startApp();
    }
}

new App();
