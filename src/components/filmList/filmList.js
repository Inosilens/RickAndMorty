import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllData from "../../services/getAllData";
import "./filmList.css";
import {
  changePageAction,
  getAllPagesAction,
} from "../../redux/reducers/pagination";
import ReactPaginate from "react-paginate";
import LinksNav from "../navLinks/linksNav";
import {
  getDataFilmInfoAction,
  getDataFilmsAction,
} from "../../redux/reducers/filmList";
import { Link } from "react-router-dom";

function FilmList() {
  const dataFilms = useSelector((state) => state.data.data);
  const CURRENT_PAGE = useSelector((state) => state.pagination.currentPage);
  const ALL_PAGES = useSelector((state) => state.pagination.allPages);

  const DISPATCH = useDispatch();

  useEffect(() => {
    getAllData(`https://rickandmortyapi.com/api/episode/?page=${CURRENT_PAGE}`)
      .then((r) => {
        DISPATCH(getDataFilmsAction(r.results));
        DISPATCH(getAllPagesAction(r.info.pages));
      })
      .catch((eror) => alert(eror));
  }, [CURRENT_PAGE]);

  const changePage = (data) => {
    return DISPATCH(changePageAction(data.selected + 1));
  };

  const getMoreInfo = (film) => {
    DISPATCH(getDataFilmInfoAction(film));
  };

  return (
    <div className=" justify-content-between d-flex flex-column align-items-center">
      <LinksNav />
      <div className="d-flex flex-row row justify-content-between p-5">
        {dataFilms.map((film, index) => (
          <Link to={"/filmInfo"}>
            <div
              onClick={() => getMoreInfo(film)}
              className="content__container "
              key={index}
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
        pageCount={ALL_PAGES}
        marginPagesDisplayed={0}
        pageRangeDisplayed={6}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default FilmList;
