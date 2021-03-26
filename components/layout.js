/*
* @Author: Mario Ravalli
* @Date:   2021-02-19 12:44:17
* @Last Modified by:   Mario Ravalli
* @Last Modified time: 2021-03-26 00:10:08
*/
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { faTwitter, faFacebookSquare, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBars, faBook, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const name = 'Mario Ravalli'
export const siteTitle = 'Miniminaglie qua e là'

export default function Layout({children, home}) {
	const [active, setActive] = useState(false);

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
								<a className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs font-bold"
									href="/posts">
									<FontAwesomeIcon icon={faBook} className="lg:text-gray-300 text-gray-500 text-lg leading-lg h-4 w-4" />
									<span className="lg:hidden inline-block ml-2">Posts</span>
								</a>
							</li>
							<li className="flex items-center">
								<a className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
									target="_blank" href="https://twitter.com/babau_mr">
									<FontAwesomeIcon icon={faTwitter} className="lg:text-gray-300 text-gray-500 text-lg leading-lg h-4 w-4" />
									<span className="lg:hidden inline-block ml-2">Tweet</span>
								</a>
							</li>
							<li className="flex items-center">
								<a className="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
									target="_blank" href="https://github.com/mrkrash">
									<FontAwesomeIcon icon={faGithub} className="lg:text-gray-300 text-gray-500 text-lg leading-lg h-4 w-4" />
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
					<div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden" style={{height: 70 + 'px', transform: 'translateZ(0px)'}}>
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
      			<div className="container mx-auto px-4">
        			<div className="flex flex-wrap">
          				<div className="w-full lg:w-6/12 px-4">
            				<h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
            				<h5 className="text-lg mt-0 mb-2 text-gray-700">
              					Trovaci sui socials, in genere rispondiamo in un paio di giorni.
            				</h5>
				        </div>
        				<div className="w-full lg:w-6/12 px-4">
            				<div className="flex flex-wrap items-top mb-6">
              					<div className="w-full lg:w-4/12 px-4 ml-auto">
                					<span className="block uppercase text-gray-600 text-sm font-semibold mb-2">Useful Links</span>
                					<ul className="list-unstyled">
										<li>
                    						<a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
                    							target="_blank" href="https://www.lareclameitalia.com/la-reclame-italia/">Chi Siamo</a>
										</li>
                  						<li>
						                    <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
						                    	target="_blank" href="https://www.lareclameitalia.com/magazine/">Magazine</a>
						                </li>
						                <li>
						                    <a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
						                    	target="_blank" href="https://github.com/mrkrash">Github</a>
										</li>
									</ul>
								</div>
								<div className="w-full lg:w-4/12 px-4">
									<span className="block uppercase text-gray-600 text-sm font-semibold mb-2">Other Resources</span>
									<ul className="list-unstyled">
										<li>
											<a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
												target="_blank" href="https://www.lareclameitalia.com/termini-e-condizioni-del-servizio/">Termini e Condizioni</a>
										</li>
										<li>
											<a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
												target="_blank" href="http://www.lareclameitalia.com/privacy-policy/">Privacy Policy</a>
										</li>
										<li>
											<a className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
												target="_blank" href="https://www.lareclameitalia.com/#caldera_form_1">Contattaci</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<hr className="my-6 border-gray-400" />
					<div className="flex flex-wrap items-center md:justify-between justify-center">
						<div className="w-full md:w-4/12 px-4 mx-auto text-center">
							<div className="text-sm text-gray-600 font-semibold py-1">
								Copyright © 2021 Mario Ravalli
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}