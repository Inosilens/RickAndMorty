import "bootstrap-css";
import "./App.css";
import {store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

export function App() {
    return (
        <BrowserRouter>
        <Provider store={store}>
          <AppRouter/>
        </Provider>
        </BrowserRouter>
    );
}

export default App;
