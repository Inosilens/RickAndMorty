import "../App.css";
import $ from "jquery";
import getAllData from "../services/getAllData";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAction, getInputAction } from "../redux/reducers/dataList";
import { PersonList } from "./personList/personList";
import { SEARCH_URL } from "../helpers/constants";
import debounce from "debounce";
import ReactPaginate from "react-paginate";
import {
  changePageAction,
  getAllPagesAction,
} from "../redux/reducers/pagination";

export function App() {
  const PERSON = useSelector((state) => state.data.data);
  const VALUE = useSelector((state) => state.data.inputValue);
  const CURRENT_PAGE = useSelector((state) => state.pagination.currentPage);
  const ALL_PAGES = useSelector((state) => state.pagination.allPages);
  const DISPATCH = useDispatch();

  useEffect(() => {
    getAllData(
      `https://rickandmortyapi.com/api/character/${
        VALUE ? SEARCH_URL + VALUE : `?page=${CURRENT_PAGE}`
      }`
    ).then((r) => {
      DISPATCH(getDataAction(r.results));
      DISPATCH(getAllPagesAction(r.info.pages));
    });
  }, [VALUE, CURRENT_PAGE]);

  const changeInput = (e) => {
    DISPATCH(getInputAction(e.target.value));
  };

  const debouncingChangeInput = useMemo(() => {
    return debounce(changeInput, 400);
  }, []);

  const changePage = (data) => {
    DISPATCH(changePageAction(data.selected + 1));
  };

  return (
    <div className="App">
      <div>{CURRENT_PAGE}</div>
      <input
        type="text"
        onChange={debouncingChangeInput}
        placeholder="search person"
      />
      <PersonList person={PERSON} />
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={ALL_PAGES}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
