const fs = require("fs");
const path = require("path");
const postsDirectory = path.join(process.cwd(), 'posts')
const contentFilePaths = fs.readdirSync(postsDirectory).filter((path) => /\.md?$/.test(path));
const algoliasearch = require("algoliasearch/lite");
const matter = require("gray-matter");

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

async function getAllBlogPosts() {
    return contentFilePaths.map((filePath) => {
        const source = fs.readFileSync(path.join(postsDirectory, filePath))
        const {data} = matter(source)
        const id = filePath.replace(/\.md$/, '')

        return {
            id,
            data,
        }
    })
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

(async function () {
    try {
        const articles = await getAllBlogPosts();
        const transformed = transformPostsToSearchObjects(articles);
        const client = algoliasearch(
            process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
            process.env.ALGOLIA_SEARCH_ADMIN_KEY,
        );
        const index = client.initIndex("mario.raval.li");
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
