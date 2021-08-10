import React, {useEffect} from "react";
import "./filmInfoPage.css";
import {useDispatch, useSelector} from "react-redux";
import LinksNav from "../../navLinks/linksNav";
import {Link} from "react-router-dom";
import getPersonList from "../../../services/getPersonList";
import {getInfoPerson} from "../../../reducers/personList";
import {getDataFilmInfoAction} from "../../../reducers/filmList";
import Loader from "../../loader/loader";
import {getAllPersonList} from "../../../services/getAllPersonList";

function FilmInfoPage() {
    const dataFilms = useSelector((state) => state.films.infoFilmsData);
    const dispatch = useDispatch()
    const loader = useSelector(state => state.data.loading)
    const ARRAY_ON_NAMES = []

    useEffect(() => {
            if (!loader) {
                getAllPersonsInEpisode(dataFilms.characters.length ? dataFilms.characters : 0)
            }
        }
        , [])

    const getAllPersonsInEpisode = (persons) => {
        for (let i = 0; i < persons.length; i++) {
            getAllPersonList(persons[i]).then(r => ARRAY_ON_NAMES.push(r))
        }
        dispatch(getInfoPerson(ARRAY_ON_NAMES))
    }


    if (loader) {
        return (<Loader/>)
    } else {
        return (
            <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
                <LinksNav/>
                <div className=" film_cart justify-content-between mt-5 p-5">
                    <h1>{dataFilms.name}</h1>
                    <h3> Pilot data : {dataFilms.air_date}</h3>
                    <h3> Episode : {dataFilms.episode}</h3>
                    {dataFilms.characters.length ?
                        <Link to={"/personInfo"}>
                            <h3>Characters : {dataFilms.characters.length}</h3>
                        </Link> :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default FilmInfoPage;
