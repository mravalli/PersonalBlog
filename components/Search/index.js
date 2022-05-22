import algoliasearch from "algoliasearch/lite";
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { InstantSearch } from "react-instantsearch-dom";
import React, { useEffect, useState } from "react";
import Hits from "./hits";
import SearchBox from "./searchbox";

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

export default function Search() {
    const [isActive, setActive] = useState(false);
    const handleToggle = () => {
        setActive(!isActive);
    };
    useEffect(() => {
        window.addEventListener('keydown', function (event) {
            if (event.shiftKey && event.code === 'KeyK') {
                setActive(true);
            }
            if (event.code === 'Escape') {
                setActive(false);
            }
        });
        return () => {
            window.removeEventListener('keydown', function (event) {
                if (event.shiftKey && event.code === 'KeyK') {
                    setActive(true);
                }
                if (event.code === 'Escape') {
                    setActive(false);
                }
            });
        }
    }, []);


    return (
        <>
            <a onClick={handleToggle} href='#'>
                <FontAwesomeIcon icon={faSearch} className="lg:text-gray-300 text-gray-500 text-lg leading-lg h-9 w-9"/>
            </a>
            <div className={`animated fadeIn faster fixed left-0 top-0 flexitems-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover search-box ${isActive ? "" : "hidden"}`}>

                <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
                <a onClick={handleToggle} href='#' className='relative'>
                    <FontAwesomeIcon icon={faTimesCircle} className="lg:text-gray-300 text-gray-500 text-lg leading-lg h-9 w-9"/>
                </a>
                <div className="w-full max-w-lg relative mx-auto shadow-lg bg-white rounded-lg">
                    <InstantSearch searchClient={searchClient} indexName="mario.raval.li">
                        <SearchBox />
                        <Hits />
                    </InstantSearch>
                </div>
            </div>
        </>
    );
}
