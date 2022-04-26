import React, { useEffect, useState } from 'react';
import axios from "axios";
import serverConfig from './../app/ServerConfig';
import { Link } from 'react-router-dom';

const GitSearchComponent = () => {

    const [query, setQuery] = useState("");

    const [searchResults, setSearchResults] = useState([]);

    let searchLength = 0

    useEffect(() => {
        if (query !== "") {
            axios.get(
                `${serverConfig.proxyUrl}/search/${query}`
            ).then((res) => {
                searchLength = res.data.length
                console.log(searchLength)
                setSearchResults([...res.data.slice(0,8)])
            }).catch(e => {
                setSearchResults([]);
                console.error(e.message);
            });
        }

    }, [query]);

    return (
        <div className="container">
            <div className="search-bar">
                <input type="text" className="w-full border-secondary form-control mx-auto" placeholder='Type here to search Users' value={query} onChange={(e) => setQuery(e.target.value)} />
                {searchResults.length > 0 ? (
                    <div className="position-absolute">
                        <div className="searchResults position-relative bottom-100 w-100">
                            <ul className='list-group'>
                                {searchResults.map(result => (<li key={result.id} className='list-group-item' ><Link to={`/info/${result.login}`} ><span onClick={() => {
                                    setSearchResults([]);
                                    setQuery("");
                                }} >{result.login}</span></Link></li>))}
                            </ul>
                        </div>
                    </div>
                ) : <></>}
            </div>
        </div>
    );
}

export default GitSearchComponent;

const SearchResults = (props) => {
    return <div>{props}</div>
}