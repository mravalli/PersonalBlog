/*
* @Author: Mario Ravalli
* @Date:   2021-03-23 00:07:24
* @Last Modified by:   Mario Ravalli
* @Last Modified time: 2021-03-23 15:10:46
*/
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { faBriefcase, faMapMarker, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Date from '../../components/date'
import Layout, { siteTitle } from '../../components/layout'
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
                            <div className="mt-12 mb-6 flex flex-col">
                                {allPostsData.map(({ id, date, image, short }) => (
                                    <div className="mt-4" key="${id}">
                                        <Link href={`/posts/${id}`} key={id}>
                                            <article className="flex flex-row cursor-pointer">
                                                <div className="flex flex-col w-64">
                                                    <Date dateString={date} />
                                                </div>
                                                <div className="flex-auto px-5">
                                                    <h2>{short}</h2>
                                                    <small></small>
                                                </div>
                                            </article>                          
                                        </Link>
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