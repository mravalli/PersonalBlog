import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { faBriefcase, faMapMarker, faMusic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getLastPostData } from '../lib/posts'

export async function getStaticProps() {
  const lastPost = await getLastPostData()
  
  return {
    props: {
      lastPost
    }
  }
}

export default function Home({ lastPost }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="relative py-16 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6 pb-12">
              <div className="flex flex-wrap justify-center">
                
                <div className="w-full lg:w-6/12 px-4 lg:order-2 lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <article>
                      <h1 className="">{lastPost.title}</h1>
                      <div dangerouslySetInnerHTML={{ __html: lastPost.contentHtml }} />
                    </article>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4 lg:order-1 flex justify-center">
                  <div className="hidden xl:block relative">
                    <img alt="Mario Ravalli" src="/images/me.webp" style={{maxWidth: 150 + 'px'}}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-20 -ml-20 lg:-ml-16" />
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mt-12"> Mario Ravalli </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                      <FontAwesomeIcon icon={faMapMarker} className="inline mr-2 text-lg text-gray-500 h-4 w-4"/>
                      Ragusa, Italy
                    </div>
                    <div className="mb-2 text-gray-700 mt-10">
                      <FontAwesomeIcon icon={faBriefcase} className="inline mr-2 text-lg text-gray-500 h-4 w-4" />
                      Full Stack Developer
                    </div>
                    <div className="mb-2 text-gray-700">
                      <FontAwesomeIcon icon={faMusic} className="inline mr-2 text-lg text-gray-500 h-4 w-4" />
                      Poor Flugelhorn Player
                    </div>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </Layout>
  )
}
