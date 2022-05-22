/*
* @Author: Mario Ravalli
* @Date:   2021-02-19 12:44:17
* @Last Modified by:   Mario Ravalli
* @Last Modified time: 2021-11-15 12:27:22
*/
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import prism from 'prismjs'
import { faFacebookSquare, faGithub, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBars, faBook, faHome, faIdBadge } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Search from "./Search";

const name = 'Mario Ravalli'
export const siteTitle = 'Miniminaglie qua e là'

export default function Layout({children, home}) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const toggleNavbar = () => {
    setActive(!active);
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
        <meta name="description" content="Miniminaglie di uno sviluppatore che ancora non ha ben chiaro che linguaggio usare" />
        <meta property="og:image" content="https://mario.raval.li/images/polpo.webp" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="Le Miniminaglie ci sono anche su twitter!!" />
        <meta name="google-site-verification" content="3abBceRSMUbdJuFrqF72Z9yILjM6DPciZ3Ef0ksX_SY" />
      </Head>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative px-4 flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-white text-3xl">
                <Image src="/logo.webp" alt="Raval.li" width={48} height={48} />
              </a>
            </Link>
            <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={toggleNavbar}>
              <FontAwesomeIcon icon={faBars} className="text-pink-900 h-11 w-11" />
            </button>
          </div>
          <div className={`${active ? '' : 'hidden'} shadow lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none`}
            id="collapse-navbar">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              
              <li className="flex items-center">

                  <Search />

              </li>
              <li className="flex items-center">
                <a className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs font-bold"
                   href="/">
                  <FontAwesomeIcon icon={faHome} className="lg:text-gray-300 text-gray-500 text-lg leading-lg h-9 w-9" />
                  <span className="lg:hidden inline-block ml-2">Home</span>
                </a>
              </li>
              <li className="flex items-center">
                <a className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs font-bold"
                  href="/posts">
                  <FontAwesomeIcon icon={faBook} className="lg:text-gray-300 text-gray-500 text-lg leading-lg h-8 w-8" />
                  <span className="lg:hidden inline-block ml-2">Posts</span>
                </a>
              </li>
              <li className="flex items-center">
                <a className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  target="_blank" href="https://www.linkedin.com/in/marioravalli/">
                  <FontAwesomeIcon icon={faLinkedin} className="lg:text-gray-300 text-gray-500 text-lg leading-lg h-8 w-8" />
                  <span className="lg:hidden inline-block ml-2">Linkedin</span>
                </a>
              </li>
              <li className="flex items-center">
                <a className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  target="_blank" href="https://twitter.com/babau_mr">
                  <FontAwesomeIcon icon={faTwitter} className="lg:text-gray-300 text-gray-500 text-lg leading-lg h-8 w-8" />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>
              <li className="flex items-center">
                <a className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  target="_blank" href="https://github.com/mrkrash">
                  <FontAwesomeIcon icon={faGithub} className="lg:text-gray-300 text-gray-500 text-lg leading-lg h-8 w-8" />
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="profile-page">
        <section className="relative block" style={{height: 300 + 'px'}}>
          <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("/images/polpo.webp")'}}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden" style={{height: 70 + 'px', transform: 'translateZ(0px) translateY(1px)'}}>
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0">
              <polygon className="text-gray-300 fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </section>
        {children}
      </main>
      <footer className="relative bg-gray-300 pt-8 pb-6">
        <div className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20" 
            style={{height: 80 + 'px', transform: 'translateZ(0px)'}}>
          <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0">
            <polygon className="text-gray-300 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 font-semibold py-1">
              Copyright © 2022 Mario Ravalli
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
