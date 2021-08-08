import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap";
import { changeDrop } from "../../../redux/reducers/personList";

function PersonInfo() {
  const showList = useSelector((state) => state.data.showList);
  const person = useSelector((state) => state.data.currentPersonInfo);
  const DISPATH = useDispatch();


  const showEpisodes = () => {
      showList ?
    DISPATH(changeDrop("")):
          DISPATH(changeDrop(true) );
  };
  if (!person.name) {
    return <div>no users</div>;
  } else {
    return (
      <div className="container pt-5 d-flex flex-column justify-content-center align-items-center text-center">
        <Link to={"/PersonList"}>
          <button>Go to list</button>
        </Link>
        <div className="person__cart p-5 mt-5 d-flex flex-row">
          <div>
            <img src={person.image} alt="" />
          </div>
          <div className="d-flex flex-column justify-content-between align-items-center">
            <h1> Name :{person.name}</h1>
            <h4>Geneder : {person.gender}</h4>
            <h4>Status : {person.status}</h4>
            <h4>Species : {person.species}</h4>
            <h4> Home World : {person.origin.name}</h4>
            <div
              onClick={showEpisodes}
              className={showList===true ? "dropdown show" : "dropdown"}
            >
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                 Episodes : {person.episode.length}
              </a>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                {person.episode.map((item) => (
                  <li className="dropdown-item" href="#">
                    {item}
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonInfo;
