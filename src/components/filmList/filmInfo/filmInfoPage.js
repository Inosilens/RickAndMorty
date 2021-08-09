import React, {useEffect} from "react";
import "./filmInfoPage.css";
import {useDispatch, useSelector} from "react-redux";
import LinksNav from "../../navLinks/linksNav";
import {Link} from "react-router-dom";
import getAllData from "../../../services/getAllData";
import {getInfoPerson} from "../../../actions/personList";
import {getDataFilmInfoAction} from "../../../actions/filmList";

function FilmInfoPage() {
    const DATA_FILM_INFO = useSelector((state) => state.films.infoFilmsData);
    const DISPATCH = useDispatch()
    const ARRAY_ON_NAMES = []

    useEffect(() => getAllPersonsInEpisode(DATA_FILM_INFO.characters), [])

    const getAllPersonsInEpisode = (persons) => {

        for (let i = 0; i < persons.length; i++) {
            getAllData(persons[i]).then(r => ARRAY_ON_NAMES.push(r))

        }
        DISPATCH(getInfoPerson(ARRAY_ON_NAMES))

    }

    if (!DATA_FILM_INFO) {
        return (<div>
            Failed LOAD
        </div>)
    }
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
            <LinksNav/>
            <div className=" film_cart justify-content-between mt-5 p-5">
                <h1>{DATA_FILM_INFO.name}</h1>
                <h3> Pilot data : {DATA_FILM_INFO.air_date}</h3>
                <h3> Episode : {DATA_FILM_INFO.episode}</h3>
                {DATA_FILM_INFO.characters.length ? <Link to={"/personInfo"}>

                        <h3 >Characters : {DATA_FILM_INFO.characters.length}</h3>

                    </Link> :
                    null
                }


            </div>
        </div>
    );
}

export default FilmInfoPage;
