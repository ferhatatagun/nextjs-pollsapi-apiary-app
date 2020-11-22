import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import ProgressLoader from '../../components/ProgressLoader'
import { useEffect } from 'react'
import { BackTop } from 'antd'

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%'
}

const contentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
}

const Layout = (props) => (
  <div className="Layout" style={layoutStyle}>
    <Head>
      <title>{props.title}</title>
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=es6" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Poppins:200,400"
      />
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <BackTop />
    <Header title={props.title} subtitle={props.subtitle} />
    <div className="Content" style={contentStyle}>
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Layout
