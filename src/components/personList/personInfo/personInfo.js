import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "bootstrap";
import {changeDrop} from "../../../redux/reducers/personList";
import {getDataFilmInfoAction} from "../../../redux/reducers/filmList";
import getAllData from "../../../services/getAllData";
import LinksNav from "../../navLinks/linksNav";

function PersonInfo() {

    const person = useSelector((state) => state.data.currentPersonInfo);
    const activeArray = useSelector(state => state.data.activeDrop)
    const DISPATCH = useDispatch();


    const getMoreInfo = (film) => {
        getAllData(film).then(r => {
                DISPATCH(getDataFilmInfoAction(r)
                )
                DISPATCH(changeDrop())
            }
        )

    };


    const showEpisodes = (id) => {

        return DISPATCH(changeDrop(id))


    };
    if (!person) {

        return (
            <div className="container pt-5 d-flex flex-column justify-content-center align-items-center text-center">
                <LinksNav/>
                Failed Load</div>)
    } else {
        if (Array.isArray(person)) {
            return (
                <div
                    className="container pt-5 d-flex flex-column justify-content-center align-items-center text-center">
                    <LinksNav/>
                    <div
                    >
                        {person.map((person, index) =>

                            <div key={index}
                                 className="person__cart p-5 mt-5 d-flex flex-row justify-content-around align-items-center">
                                <div>
                                    <img src={person.image} alt=""/>
                                </div>
                                <div className="d-flex flex-column justify-content-between align-items-center">
                                    <h1> Name :{person.name}</h1>
                                    <h4>Gender : {person.gender}</h4>
                                    <h4>Status : {person.status}</h4>
                                    <h4>Species : {person.species}</h4>
                                    <h4> Home World : {person.origin.name}</h4>
                                    <div
                                        onClick={() => showEpisodes(person.id)}
                                        className={person.id === activeArray[0] ? "dropdown show" : "dropdown "}
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
                                                <Link to={"/filmInfo"}>
                                                    <li onClick={() => getMoreInfo(item)} className="dropdown-item"
                                                        href="#">
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
                            <img src={person.image} alt=""/>
                        </div>
                        <div className="d-flex flex-column justify-content-between align-items-center">
                            <h1> Name :{person.name}</h1>
                            <h4>Gender : {person.gender}</h4>
                            <h4>Status : {person.status}</h4>
                            <h4>Species : {person.species}</h4>
                            <h4> Home World : {person.origin.name}</h4>
                            <div
                                onClick={() => showEpisodes(person.id)}
                                className={person.id === activeArray[0] ? "dropdown show" : "dropdown "}
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
                                        <Link to={"/filmInfo"}>
                                            <li onClick={() => getMoreInfo(item)} className="dropdown-item" href="#">
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
