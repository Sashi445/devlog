import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import RepoListItem from './RepoListItem';

function CommunityPagination({ items, itemsPerPage }) {

  const [currentIndex, setCurrentIndex] = useState(0);

  const refined = items.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  useEffect(() => {
    // TODO : make an API request to url with value = currentIndex*itemsPerPage + itemsPerPage
    // TODO : URI Example : {rootAPI Url}/posts?items=value
  }, [currentIndex]);


  return (
    <div className="container py-2">

      <nav className="controller">
        <ul className="pagination justify-content-center py-2">
        <li className={currentIndex === 0 ? `page-item disabled` : `page-item cursor-pointer`}>
            <span className="page-link" onClick={() => { setCurrentIndex(currentIndex - 1)} } >
                <FaChevronLeft />
            </span>
        </li>
        {Array.from( 
          { length: ( Math.ceil(items.length / itemsPerPage) ) },(_, i) => i).map((i) => (
          <li className="page-item" onClick={() => setCurrentIndex(i)}>
          <span className={currentIndex === i ? "page-link bg-light " : "page-link cursor-pointer"}>{i + 1}</span></li>
        ))}
        <li className={currentIndex === (Math.ceil(items.length / itemsPerPage)-1) ? `page-item disabled` : `page-item cursor-pointer`}>
            <span className="page-link" onClick={() => { setCurrentIndex(currentIndex + 1)} } >
                <FaChevronRight />
            </span>
          </li>
        </ul>
      </nav>

      <div className="items">
        <ul>
          {refined.map((item) => (
            <RepoListItem key={item.id} repo={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CommunityPagination;
