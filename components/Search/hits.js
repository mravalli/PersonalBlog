import { connectStateResults } from "react-instantsearch-dom";
import Tags from "../tags";

function Hits({ searchState, searchResults }) {
    const validQuery = searchState.query?.length >= 3;

    return (
        <>
            {searchResults?.hits.length === 0 && validQuery && (
                <div className="w-full max-w-lg relative mx-auto shadow-lg bg-white p-5">
                    Aw snap! No search results were found.
                </div>
            )}
            {searchResults?.hits.length > 0 && validQuery && (
                <div className="w-full max-w-lg relative mx-auto shadow-lg rounded-b-lg border-t-4 bg-white">
                    <div className="max-h-full mx-auto shadow-lg bg-white p-5 rounded-b-lg overflow-visible">
                        <ol>
                            {searchResults.hits.map((hit) => (
                                <li key={hit.objectID}>
                                    <a href={hit.slug}>{hit.title}</a>
                                    <div>
                                        <Tags arrayTags={hit.tagsCollection.tags} />
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </>
    );
}

export default connectStateResults(Hits);