import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeDrop, setLoadingAction } from "../../../reducers/personList";
import { getDataFilmInfoAction } from "../../../reducers/filmList";
import LinksNav from "../../navLinks/linksNav";
import "bootstrap";
import "./personInfo.css";
import Loader from "../../loader/loader";
import { getFilmInfo } from "../../../services/getFilmInfo";
import { useHistory } from "react-router";

function PersonInfo() {
  const person = useSelector((state) => state.data.currentPersonInfo);
  const activeDrop = useSelector((state) => state.data.activeDrop);
  const loader = useSelector((state) => state.data.loading);
  const router = useHistory();
  const dispatch = useDispatch();
  const getMoreInfo = (film) => {
    dispatch(setLoadingAction(true));
    getFilmInfo(film).then((data) => {
      dispatch(changeDrop([]));
      dispatch(getDataFilmInfoAction(data));
      dispatch(setLoadingAction(false));
    });
  };
  const showEpisodes = (id) => {
    id === activeDrop[0]
      ? dispatch(changeDrop([]))
      : dispatch(changeDrop([id]));
  };
  if (!person) {
    return (
      <>
        <LinksNav />
        <div>Failed load</div>
      </>
    );
  } else {
    if (Array.isArray(person)) {
      return (
        <div className="container d-flex flex-column  align-items-center">
          <LinksNav />
          <div className="row d-flex justify-content-between mt-5">
            {person.map((person, index) => (
              <div
                key={index}
                className="person__cart d-flex flex-column p-2 m-2 text-center"
              >
                <div>
                  <img src={person.image} alt="" />
                </div>
                <div className="d-flex flex-column justify-content-between align-items-center">
                  <h3> {person.name}</h3>
                  <p>Gender : {person.gender}</p>
                  <p>Status : {person.status}</p>
                  <p>Species : {person.species}</p>
                  <p> Home World : {person.origin.name}</p>
                  <div
                    onClick={() => showEpisodes(person.id)}
                    className={
                      person.id === activeDrop[0]
                        ? "dropdown show"
                        : "dropdown "
                    }
                  >
                    <a
                      className="btn btn-secondary dropdown-toggle"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Episodes : {person.episode.length}
                    </a>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {person.episode.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => {
                            getMoreInfo(item);
                            router.push(`/Films/${item.substr(40, 2)}`);
                          }}
                          className="dropdown-item"
                        >
                          Episode : {item.substr(40, 2)}
                        </li>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container pt-5 d-flex flex-column justify-content-center align-items-center text-center">
          <LinksNav />
          <div className="person__cart p-5 mt-5 d-flex flex-row">
            <div>
              <img src={person.image} alt="" />
            </div>
            <div className="d-flex flex-column justify-content-between align-items-center">
              <h1> Name :{person.name}</h1>
              <h4>Gender : {person.gender}</h4>
              <h4>Status : {person.status}</h4>
              <h4>Species : {person.species}</h4>
              <h4> Home World : {person.origin.name}</h4>
              <div
                onClick={() => showEpisodes(person.id)}
                className={
                  person.id === activeDrop[0] ? "dropdown show" : "dropdown "
                }
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

                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  {person.episode.map((item, index) => (
                    <li
                      key={item.id}
                      onClick={() => {
                        getMoreInfo(item);
                        router.push(`/Films/${item.substr(40, 2)}`);
                      }}
                      className="dropdown-item"
                    >
                      Episode: {item.substr(40, 2)}
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
}

export default PersonInfo;
