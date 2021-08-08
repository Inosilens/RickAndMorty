import React from 'react';
import LinksNav from "../navLinks/linksNav";

function Main() {
    return (
        <div className="d-flex justify-content-between flex-column align-items-center">
            <h1>Welcome to Site</h1>
            <LinksNav/>
        </div>
    );
}

export default Main;