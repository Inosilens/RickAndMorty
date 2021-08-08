import React from 'react';

function HeaderList({changeInput}) {
    return (
        <div><input
            type="text"
            onChange={changeInput}
            placeholder="search person"
        />
            <button>Clear</button></div>
    );
}

export default HeaderList;