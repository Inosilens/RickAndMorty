import React, {useEffect} from "react";
import "./filmInfoPage.css";
import {useDispatch, useSelector} from "react-redux";
import LinksNav from "../../navLinks/linksNav";
import {Link} from "react-router-dom";
import getAllData from "../../../services/getAllData";
import {getInfoPerson} from "../../../redux/reducers/personList";

function FilmInfoPage() {
    const dataFilmInfo = useSelector((state) => state.films.infoFilmsData);
    const DISPATCH = useDispatch()
    const namesArray = []

    useEffect(() => getAllPersonsInEpisode(dataFilmInfo.characters), [])

    const getAllPersonsInEpisode = (persons) => {

        for (let i = 0; i < persons.length; i++) {
            getAllData(persons[i]).then(r => namesArray.push(r))

        }
        DISPATCH(getInfoPerson(namesArray))


    }


    return (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
            <LinksNav/>
            <div className=" film_cart justify-content-between mt-5 p-5">
                <h1>{dataFilmInfo.name}</h1>
                <h3> Pilot data : {dataFilmInfo.air_date}</h3>
                <h3> Episode : {dataFilmInfo.episode}</h3>
                <Link to={"/personInfo"}>

                        <h3>Characters : {dataFilmInfo.characters.length}</h3>

                </Link>


            </div>
        </div>
    );
}

export default FilmInfoPage;
