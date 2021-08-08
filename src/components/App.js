import "bootstrap-css";
import "../App.css";
import { PersonList } from "./personList/personList";
import { Redirect, Route, Switch } from "react-router";
import FilmList from "./filmList/filmList";
import Main from "./main/main";
import FilmInfoPage from "./filmList/filmInfo/filmInfoPage";
import PersonInfo from "./personList/personInfo/personInfo";

export function App() {
  return (
    <Switch>
      <Route path="/Main" component={Main} />
      <Route
        path="/PersonList"
        render={() => (
          <>
            <PersonList />
          </>
        )}
        component={PersonList}
      />
      <Route
        path="/FilmList"
        render={() => (
          <>
            <FilmList />
          </>
        )}
      />
      <Route path="/filmInfo" component={FilmInfoPage} />
      <Route path="/personInfo" component={PersonInfo} />
      <Redirect from="/" to="/Main" />
    </Switch>
  );
}

export default App;
