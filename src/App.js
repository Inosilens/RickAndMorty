import "bootstrap-css";
import "./App.css";
import {PersonList} from "./components/personList/personList";
import {Redirect, Route, Router, Switch} from "react-router";
import FilmList from "./components/filmList/filmList";
import Main from "./components/main/main";
import FilmInfoPage from "./components/filmList/filmInfo/filmInfoPage";
import PersonInfo from "./components/personList/personInfo/personInfo";
import {store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

export function App() {
    return (
        <BrowserRouter>
        <Provider store={store}>
            <Route path="/Main" component={Main}/>
            <Route path="/PersonList" component={PersonList}/>
            <Route path="/FilmList" component={FilmList}/>
            <Route path="/filmInfo" component={FilmInfoPage}/>
            <Route path="/personInfo" component={PersonInfo}/>
            <Redirect from="/" to="/Main"/>
        </Provider>
        </BrowserRouter>
    );
}

export default App;
