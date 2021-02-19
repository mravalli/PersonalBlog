/*
* @Author: Mario Ravalli
* @Date:   2021-02-19 12:44:17
* @Last Modified by:   Mario Ravalli
* @Last Modified time: 2021-02-19 17:10:47
*/
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const name = 'Mario Ravalli'
export const siteTitle = 'Miniminaglie qua e là'

export default function Layout({children, home}) {
	return (
		<div className="md:container md:mx-auto">
			<Head>
				<link rel="icon" href="/favicon.png" type="image/x-icon" />
				<meta name="description" content="Miniminaglie di uno sviluppatore che ancora non ha ben chiaro che linguaggio usare" />
				<meta property="og:image" content="https://mario.raval.li/images/polpo.jpg" />
				<meta name="og:title" content={siteTitle} />
				<meta name="twitter:card" content="Le Miniminaglie ci sono anche su twitter!!" />
			</Head>
			<header className="inline-flex">
				{home ? (
					<div>
						<Image
							priority
							src="/images/polpo.jpg"
							height={400}
							width={1907}
							alt="Polpo in miniminaglia" />
					</div>
				) : (
					<div>
						<div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
				          <Image src="/images/me.jpg" className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0" height={144} width={144} alt="Mario Ravalli" />
				          <div className="text-center space-y-2 sm:text-left">
				            <div className="space-y-0.5">
				              <p className="text-lg text-black font-semibold">
				                Mario Ravalli
				              </p>
				              <p className="text-gray-500 font-medium">
				                mm, developer?
				              </p>
				            </div>
				            <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button>
				          </div>
				        </div>
					</div>
				)}
			</header>
			<main>{children}</main>
			{!home && (
				<div className="">
					<Link href="/"><a>← Back to home</a></Link>
				</div>
			)}
		</div>
	)
}