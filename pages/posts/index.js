/*
* @Author: Mario Ravalli
* @Date:   2021-03-23 00:07:24
* @Last Modified by:   Mario Ravalli
* @Last Modified time: 2021-11-14 12:08:50
*/
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { faArrowRight, faBriefcase, faMapMarker, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Date from '../../components/date'
import Layout, { siteTitle } from '../../components/layout'
import Tags from '../../components/tags'
import { getSortedPostsData } from '../../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Posts({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="relative py-16 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="m-4 lg:flex lg:flex-wrap">
                {allPostsData.map(({ id, date, image, tags, title, abstract }) => (
                  <div className="p-4 md:w-1/3" key="${id}">
                    <div className="border-2 border-gray-200 rounded-lg">
                      <img className="object-cover object-center w-full lg:h-48 md:h-36" src={image} />
                      <div className="p-6">
                        <span className="inline-block p-2 mb-2 text-xs font-medium tracking-widest text-indigo-800 bg-indigo-200 rounded">
                          <Date dateString={date} />
                        </span>
                        <Link href={`/posts/${id}`} key={id}>
                          <h1 className="mb-2 text-2xl font-medium text-gray-900 cursor-pointer">{title}</h1>
                        </Link>
                        <p className="mb-2 text-sm tracking-wide text-gray-700">{abstract}</p>
                        <Tags arrayTags={tags} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}