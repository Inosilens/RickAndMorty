import React, { useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import getAllData from "../../services/getAllData";
import { SEARCH_URL } from "../../helpers/constants";
import {getDataAction, getInfoFilm, getInfoPerson, getInputAction} from "../../redux/reducers/personList";
import {
  changePageAction,
  getAllPagesAction,
} from "../../redux/reducers/pagination";
import { useDispatch, useSelector } from "react-redux";
import debounce from "debounce";
import HeaderList from "./headerList";
import LinksNav from "../navLinks/linksNav";
import { Link } from "react-router-dom";
import "./personList.css"
export function PersonList({ person }) {
  const PERSON = useSelector((state) => state.data.data);
  const VALUE = useSelector((state) => state.data.inputValue);
  const CURRENT_PAGE = useSelector((state) => state.pagination.currentPage);
  const ALL_PAGES = useSelector((state) => state.pagination.allPages);
  const DISPATCH = useDispatch();

  useEffect(() => {
    getAllData(
      `https://rickandmortyapi.com/api/character/${
        VALUE
          ? `?page=${CURRENT_PAGE + SEARCH_URL + VALUE}`
          : `?page=${CURRENT_PAGE}`
      }`
    )
      .then((r) => {
        DISPATCH(getDataAction(r.results));
        DISPATCH(getAllPagesAction(r.info.pages));
      })
      .catch((eror) => alert(eror));
  }, [VALUE, CURRENT_PAGE]);

  const changeInput = (e) => {
    return DISPATCH(getInputAction(e.target.value));
  };
  const debouncingChangeInput = useMemo(() => {
    return debounce(changeInput, 400);
  }, []);

  const changePage = (data) => {
    return DISPATCH(changePageAction(data.selected + 1));
  };

  const getInfoOnPerson = (person)=>{
      DISPATCH(getInfoPerson(person))
  }
  return (
    <div className="container d-flex flex-column  align-items-center">
      <LinksNav />
      <HeaderList changeInput={debouncingChangeInput} />
      <div className="row d-flex justify-content-between mt-5">
        {PERSON.map((item, index) => (
          <div className="person__cart d-flex flex-column p-2 m-2 text-center" key={index}>
            <div className="m-2 d-flex flex-column">
              {" "}
              <img src={item.image} width="300px" alt="" />
             <h5>{item.name}</h5>
            </div>
            <Link to={"/personInfo"}>
              <button className="btn btn-secondary" onClick={()=>getInfoOnPerson(item)}>Get more info on person</button>
            </Link>
          </div>
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
