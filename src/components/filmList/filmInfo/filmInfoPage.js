import React from 'react';
import "./filmInfoPage.css"
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function FilmInfoPage(props) {
    const dataFilmInfo = useSelector((state) => state.films.infoFilmsData);
    console.log(dataFilmInfo)
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
            <Link to={"/FilmList"}>
                <button className="btn btn-secondary">Back to list</button>
            </Link>
            <div className=" film_cart justify-content-between mt-5 p-5">
            <h1>{dataFilmInfo.name}</h1>
            <h3> Pilot data : {dataFilmInfo.air_date}</h3>
            <h3> Episode : {dataFilmInfo.episode}</h3>
            <h3>Characters : {dataFilmInfo.characters.length}</h3>
            </div>
        </div>
    );
}

export default FilmInfoPage;