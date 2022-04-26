import React, { useState } from "react";
// import { FaChevronLeft } from "react-icons/fa";
import PostView from "./PostView.jsx"

const Pagination = ({ items, itemsPerPage }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const refined = items.slice(
        0,
        currentIndex * itemsPerPage + itemsPerPage
    );

    return (
        <div>
            <div className="items">
                
                    {refined.map((item) => (    
                        <PostView post ={item} />
                    ))}
                
            </div>
            <nav className="controller">
                <ul className="pagination justify-content-center py-4">
                    {/* <li className={currentIndex === 0 ? `page-item disabled` : `page-item cursor-pointer`}>
                        <span className="page-link" onClick={() => { setCurrentIndex(currentIndex - 1) }} >
                            <FaChevronLeft />
                        </span>
                    </li>
                    {Array.from( { length: (Math.ceil(items.length / itemsPerPage)) }, (_, i) => i).map((i) => (
                            <li className="page-item" onClick={() => setCurrentIndex(i)}>
                            <span className={currentIndex === i ? "page-link bg-light " : "page-link cursor-pointer"}>{i + 1}</span></li>
                        ))} */}
                    <li className={currentIndex === (Math.ceil(items.length / itemsPerPage)-1) ? `page-item disabled` : `page-item cursor-pointer`}>
                        <span className="page-link mt-5" onClick={() => { setCurrentIndex(currentIndex + 1) }} >
                            More
                        </span>
                    </li>
                </ul>
            </nav>
        </div>
        
    );
}

export default Pagination;




// function CommunityPagination({ items, itemsPerPage }) 

//     useEffect(() => {
//         // TODO : make an API request to url with value = currentIndex*itemsPerPage + itemsPerPage
//         // URI Example : {rootAPI Url}/posts?items=value
//     }, [currentIndex]);


// }

