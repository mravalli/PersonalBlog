import React from "react";
// import fs from 'fs'
import { getSortedPostsData } from '../lib/posts'

const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://mario.raval.li",
  }[process.env.NODE_ENV];

  // const staticPages = fs
  //   .readdirSync({
  //     development: 'pages',
  //     production: './',
  //   }[process.env.NODE_ENV])
  //   .filter((staticPage) => {
  //     return ![
  //       "_app.js",
  //       "_document.js",
  //       "_error.js",
  //       "sitemap.xml.js",
  //       "package.json",
  //       "node_modules",
  //       ".next",
  //       "__nex_launcher.js",
  //       "__vc_bridge.js",
  //     ].includes(staticPage);
  //   })
  //   .map((staticPagePath) => {
  //     return `${baseUrl}/${staticPagePath}`;
  //   });

  const posts = getSortedPostsData()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts
        .map(({id, date}) => {
          return `
            <url>
              <loc>${baseUrl}/posts/${id}</loc>
              <lastmod>${new Date(date).toISOString()}</lastmod>
              <changefreq>yearly</changefreq>
              <priority>1.0</priority>
            </url>
          `
        })
        .join("")
      }
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;