import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { faBriefcase, faMapMarker, faUniversity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="relative py-16 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img alt="Mario Ravalli" src="/images/me.jpg" style={{maxWidth: 150 + 'px'}}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16" />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div class="py-6 px-3 mt-32 sm:mt-0">
                    <button class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{transition: 'all 0.15s ease 0s'}}>Contattami</button>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                  <div class="flex justify-center py-4 lg:pt-4 pt-8">
                    <div class="mr-4 p-3 text-center">
                      <span class="text-xl font-bold block uppercase tracking-wide text-gray-700">22</span>
                      <span class="text-sm text-gray-500">Posts</span>
                    </div>
                    <div class="lg:mr-4 p-3 text-center">
                      <span class="text-xl font-bold block uppercase tracking-wide text-gray-700">89</span>
                      <span class="text-sm text-gray-500">Commenti</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2"> Mario Ravalli </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                  <FontAwesomeIcon icon={faMapMarker} className="inline mr-2 text-lg text-gray-500 h-4 w-4"/>
                  Ragusa, Italia
                </div>
                <div className="mb-2 text-gray-700 mt-10">
                  <FontAwesomeIcon icon={faBriefcase} className="inline mr-2 text-lg text-gray-500 h-4 w-4" />
                  Full Stack Developer - Poor Trumpet Player
                </div>
                <div className="mb-2 text-gray-700">
                  <FontAwesomeIcon icon={faUniversity} className="inline mr-2 text-lg text-gray-500 h-4 w-4" />
                  University of Computer Science
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-gray-300 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-gray-800">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-12 mb-6 flex flex-col">
                {allPostsData.map(({ id, date, image, short }) => (
                    <div className="mt-4">
                      <Link href={`/posts/${id}`} key={id}>
                        <div className="flex flex-col shadow-md cursor-pointer rounded-xl">
                          <section className="flex flex-row sm:flex-row lg:flex-row xl:flex-row">
                            <h3 className="w-48 bg-blue-100 rounded-tl-xl sm:rounded-tl-none sm:rounded-bl-xl lg:rounded-tl-xl xl:rounded-tl-none text-lg leading-6 font-black text-gray-400 antialiased px-4 py-3 sm:p-8 lg:px-6 lg:py-4 xl:p-8">
                              <Date dateString={date} />
                            </h3>
                            <div className="w-68 bg-white">
                              <Image className="inline-block" src={image} height={117} width={197} />
                            </div>
                            <div className="flex-auto py-4 px-5">
                              <h2>{short}</h2>
                              <small></small>
                            </div>
                          </section>
                          
                        </div>
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
