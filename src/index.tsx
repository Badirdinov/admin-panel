import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";


//styles
import './index.css'
import {Provider} from "react-redux";
import {store} from "./redux/store";


const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);
