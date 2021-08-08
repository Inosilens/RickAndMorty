import React from 'react';
;

export function PersonList({person}) {

    return (
        <div>
            {person.map((item,index)=><div key={index}>{item.name}</div>)}
        </div>
    );
}
