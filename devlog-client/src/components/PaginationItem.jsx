import React from 'react';

const PaginationItem = (props) => {
    
    const { item, children  } = props;

    return (<>
        {children}
    </>);
}
 
export default PaginationItem;