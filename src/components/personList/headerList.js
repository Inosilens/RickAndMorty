import React from 'react';

function HeaderList({changeInput}) {
    return (
        <div><input
            type="text"
            onChange={changeInput}
            placeholder="search person"
        />
        </div>
    );
}

export default HeaderList;