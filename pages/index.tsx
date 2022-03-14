import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header';
import Feed from '../components/Feed';
import Modal from '../components/Modal';


const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram - Ossama</title>
        <link rel="icon" href="https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png" />
      </Head>

      {/* Header */}

      <Header />

      {/* Feed */}

      <Feed />

      <Modal />

    </div>
  )
}

export default Home
