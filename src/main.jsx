import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ContextDataProvider } from "./context/ContextData";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextDataProvider>
            <App />
        </ContextDataProvider>
    </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
