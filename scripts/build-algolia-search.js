const { getSortedPostsData } = require('lib/posts');
const algoliasearch = require("algoliasearch/lite");

try {
    if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
        throw new Error("NEXT_PUBLIC_ALGOLIA_APP_ID is not defined");
    }

    if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
        throw new Error("ALGOLIA_SEARCH_ADMIN_KEY is not defined");
    }
} catch (error) {
    console.error(error);
    process.exit(1);
}

function transformPostsToSearchObjects(articles) {
    return articles.map(article => {
        return {
            objectID: article.title,
            title: article.title,
            description: article.abstract,
            slug: `/posts/${article.id}`,
            tagsCollection: {tags: article.tags}, // we can nest objects in Algolia!
            date: article.publishedAt,
            type: 'article'
        };
    });
}

// everything we did so far is here

(async function () {
    try {
        const articles = getSortedPostsData();
        const transformed = transformPostsToSearchObjects(articles);

        // initialize the client with your environment variables
        const client = algoliasearch(
            process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
            process.env.ALGOLIA_SEARCH_ADMIN_KEY,
        );

        // initialize the index with your index name
        const index = client.initIndex("mario.raval.li");

        // add the data to the index
        const algoliaResponse = await index.saveObjects(transformed);

        console.log(
            `Successfully added ${algoliaResponse.objectIDs.length} records to Algolia search! Object IDs:\n${algoliaResponse.objectIDs.join(
                "\n",
            )}`,
        );
    }
    catch (err) {
        console.error(err);
    }
})();
