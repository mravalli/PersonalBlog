import { connectSearchBox } from "react-instantsearch-dom";

function SearchBox({ refine }) {
    return (
        <div className="text-center flex-auto justify-center">
            <input id="algolia_search"
                   type="search"
                   className="form-control relative rounded-lg flex-auto min-w-0 block w-full px-3 py-1.5 text-2xl font-bold text-gray-700 bg-white bg-clip-padding border-none transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                   placeholder="Cerca" aria-label="Cerca" aria-describedby="button-addon2"
                   onChange={(e) => refine(e.currentTarget.value)}/>
        </div>
    );
}

export default connectSearchBox(SearchBox);