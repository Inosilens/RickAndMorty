import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./filmList.css";
import {
    changePageAction,
    getAllPagesAction,
} from "../../reducers/pagination";
import ReactPaginate from "react-paginate";
import LinksNav from "../navLinks/linksNav";
import {
    getDataFilmInfoAction,
    getDataFilmsAction,
} from "../../reducers/filmList";
import {Link} from "react-router-dom";
import {changeDrop, setLoadingAction} from "../../reducers/personList";
import {getListFilms} from "../../services/getListFilms";
import Loader from "../loader/loader";

function FilmList() {
    const filmList = useSelector((state) => state.data.data);
    const currentPage = useSelector((state) => state.pagination.currentPage);
    const allPages = useSelector((state) => state.pagination.allPages);
    const loader = useSelector(state => state.data.loading)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoadingAction(true))
        getListFilms(currentPage)
            .then((films) => {
                dispatch(getDataFilmsAction(films.results));
                dispatch(getAllPagesAction(films.info.pages))
                dispatch(setLoadingAction(false));
            })
            .catch((eror) => alert(eror));
    }, [currentPage]);

    const changePage = (data) => {
        return dispatch(changePageAction(data.selected + 1));
    };

    const getMoreInfo = (film) => {
        dispatch(dispatch(changeDrop([])))
        dispatch(getDataFilmInfoAction(film))
        ;
    };
    if (loader) {
        return (<Loader/>)
    } else {
        return (
            <div className=" justify-content-between d-flex flex-column align-items-center">
                <LinksNav/>
                <div className="d-flex flex-row row justify-content-between p-5">
                    {filmList.map((film, index) => (
                        <Link key={index} to={"/filmInfo"}>
                            <div
                                onClick={() => getMoreInfo(film)}
                                className="content__container "
                            >
                                <h2>{film.name}</h2>
                                <h3>{film.episode}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={allPages}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={6}
                    onPageChange={changePage}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
        );
    }
}

export default FilmList;
