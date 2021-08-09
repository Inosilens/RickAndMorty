import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeDrop} from "../../../reducers/personList";
import {getDataFilmInfoAction} from "../../../reducers/filmList";
import getAllData from "../../../services/getAllData";
import LinksNav from "../../navLinks/linksNav";
import "bootstrap"
import "./personInfo.css"

function PersonInfo() {

    const PERSON = useSelector((state) => state.data.currentPersonInfo);
    const ACTIVE_ARRAY = useSelector(state => state.data.activeDrop)
    const DISPATCH = useDispatch();


    const getMoreInfo = (film) => {
        getAllData(film).then(r => {
                DISPATCH(changeDrop([]))
                DISPATCH(getDataFilmInfoAction(r)
                )

            }
        )

    };


    const showEpisodes = (id) => {
        id === ACTIVE_ARRAY[0] ?

            DISPATCH(changeDrop([])) :
            DISPATCH(changeDrop([id]))


    };

    if (!PERSON) {

        return (
            <div className="container pt-5 d-flex flex-column justify-content-center align-items-center text-center">
                <LinksNav/>
                Failed Load</div>)
    } else {
        if (Array.isArray(PERSON)) {
            return (
                <div
                    className="container d-flex flex-column  align-items-center">
                    <LinksNav/>
                    <div className="row d-flex justify-content-between mt-5"
                    >
                        {PERSON.map((person, index) =>

                            <div key={index}
                                 className="person__cart d-flex flex-column p-2 m-2 text-center">
                                <div>
                                    <img src={person.image} alt=""/>
                                </div>
                                <div className="d-flex flex-column justify-content-between align-items-center">
                                    <h3> {person.name}</h3>
                                    <p>Gender : {person.gender}</p>
                                    <p>Status : {person.status}</p>
                                    <p>Species : {person.species}</p>
                                    <p> Home World : {person.origin.name}</p>
                                    <div
                                        onClick={() => showEpisodes(person.id)}
                                        className={person.id === ACTIVE_ARRAY[0] ? "dropdown show" : "dropdown "}
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

                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            {person.episode.map((item, index) => (
                                                <Link key={index} to={"/filmInfo"}>
                                                    <li onClick={() => getMoreInfo(item)} className="dropdown-item"
                                                    >
                                                        Episod : {item.substr(40, 2)}
                                                    </li>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
        } else {
            return (
                <div
                    className="container pt-5 d-flex flex-column justify-content-center align-items-center text-center">
                    <LinksNav/>
                    <div className="person__cart p-5 mt-5 d-flex flex-row">
                        <div>
                            <img src={PERSON.image} alt=""/>
                        </div>
                        <div className="d-flex flex-column justify-content-between align-items-center">
                            <h1> Name :{PERSON.name}</h1>
                            <h4>Gender : {PERSON.gender}</h4>
                            <h4>Status : {PERSON.status}</h4>
                            <h4>Species : {PERSON.species}</h4>
                            <h4> Home World : {PERSON.origin.name}</h4>
                            <div
                                onClick={() => showEpisodes(PERSON.id)}
                                className={PERSON.id === ACTIVE_ARRAY[0] ? "dropdown show" : "dropdown "}
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
                                    Episodes : {PERSON.episode.length}
                                </a>

                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    {PERSON.episode.map((item, index) => (
                                        <Link key={index} to={"/filmInfo"}>
                                            <li onClick={() => getMoreInfo(item)} className="dropdown-item">
                                                Episode: {item.substr(40, 2)}
                                            </li>
                                        </Link>
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
