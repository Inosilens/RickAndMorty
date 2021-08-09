import React from "react";
import { Link } from "react-router-dom";
import { changePageAction } from "../../actions/pagination";
import { useDispatch } from "react-redux";

function LinksNav() {
  const DISPATCH = useDispatch();
  const changeCurrentPage = () => {
    return DISPATCH(changePageAction(1));
  };

  return (
    <div>
      <nav>
        <Link to={"/PersonList"}>
          <button
            onClick={() => changeCurrentPage()}
            className=" m-3 btn btn-secondary"
          >
            Heroes
          </button>
        </Link>
        <Link to={"/FilmList"}>
          <button
            onClick={() => changeCurrentPage()}
            className="btn btn-secondary"
          >
            Films
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default LinksNav;
