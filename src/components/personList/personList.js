import React, { useEffect, useMemo } from "react";
import ReactPaginate from "react-paginate";
import getPersonList from "../../services/getPersonList";
import { SEARCH_URL } from "../../helpers/constants";
import {
  changeDrop,
  getDataAction,
  getInfoPerson,
  getInputAction,
  setLoadingAction,
} from "../../reducers/personList";
import { changePageAction, getAllPagesAction } from "../../reducers/pagination";
import { useDispatch, useSelector } from "react-redux";
import debounce from "debounce";
import HeaderList from "./headerList";
import LinksNav from "../navLinks/linksNav";
import "./personList.css";
import { getResultOfSearch } from "../../services/getResultOfSearch";
import Loader from "../loader/loader";
import { useHistory } from "react-router";

export function PersonList() {
  const listOfPersons = useSelector((state) => state.data.data);
  const searchValue = useSelector((state) => state.data.inputValue);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const allPages = useSelector((state) => state.pagination.allPages);
  const loader = useSelector((state) => state.data.loading);
  const dispatch = useDispatch();
  const router = useHistory();

  useEffect(() => {
    if (searchValue) {
      dispatch(setLoadingAction(true));
      getResultOfSearch(currentPage, SEARCH_URL, searchValue)
        .then((r) => {
          dispatch(getDataAction(r.results));
          dispatch(getAllPagesAction(r.info.pages));
          dispatch(setLoadingAction(false));
        })
        .catch((eror) => {
          console.log(eror);
          alert("person not found");
          dispatch(setLoadingAction(false));
          return dispatch(getInputAction(""));
        });
    } else {
      dispatch(setLoadingAction(true));
      getPersonList(currentPage)
        .then((r) => {
          dispatch(getDataAction(r.results));
          dispatch(getAllPagesAction(r.info.pages));
          dispatch(setLoadingAction(false));
        })
        .catch((error) => {
          console.log(error);
          alert("person not found");
          return dispatch(getInputAction(""));
        });
    }
  }, [searchValue, currentPage]);

  const changeInput = (e) => {
    return dispatch(getInputAction(e.target.value));
  };
  const debouncingChangeInput = useMemo(() => {
    return debounce(changeInput, 400);
  }, []);

  const changePage = (data) => {
    return dispatch(changePageAction(data.selected + 1));
  };

  const getInfoOnPerson = (person) => {
    dispatch(setLoadingAction(true));
    dispatch(getInfoPerson(person));
    dispatch(changeDrop([]));
    dispatch(setLoadingAction(false));
  };
  if (loader) {
    return <Loader />;
  } else {
    return (
      <div className="container d-flex flex-column  align-items-center">
        <LinksNav />
        <HeaderList changeInput={debouncingChangeInput} />
        <div className="row d-flex justify-content-between mt-5">
          {listOfPersons.map((person, index) => (
            <div
              className="person__cart d-flex flex-column p-2 m-2 text-center"
              key={person.id}
            >
              <div className="m-2 d-flex flex-column">
                {" "}
                <img src={person.image} width="300px" alt="" />
                <h5>{person.name}</h5>
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  getInfoOnPerson(person);
                  router.push(`/Heroes/${person.id}`);
                }}
              >
                Get more info
              </button>
            </div>
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
