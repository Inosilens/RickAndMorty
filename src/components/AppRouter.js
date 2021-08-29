import React from 'react';
import {Redirect, Route, Switch} from "react-router";
import Main from "./main/main";
import {PersonList} from "./personList/personList";
import FilmList from "./filmList/filmList";
import FilmInfoPage from "./filmList/filmInfo/filmInfoPage";
import PersonInfo from "./personList/personInfo/personInfo";

const AppRouter = () => {
    return (
        <Switch>
            <Route path="/Main" component={Main}/>
            <Route exact path="/Heroes" component={PersonList}/>
            <Route exact path="/Films" component={FilmList}/>
            <Route exact path="/Films/:id" component={FilmInfoPage}/>
            <Route exact path="/Heroes/:id" component={PersonInfo}/>
            <Redirect to="/Main"/>
        </Switch>
    );
};

export default AppRouter;