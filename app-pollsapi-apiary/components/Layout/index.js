import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import { BackTop } from 'antd'

const Layout = (props) => (
  <>
    <Head>
      <title>{props.title}</title>
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=es6" />
      <link rel="icon" href="/favicon.ico" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <BackTop />
    <Header title={props.title} subtitle={props.subtitle} />
    <main className="Content">{props.children}</main>
    <Footer />
  </>
)

export default Layout
