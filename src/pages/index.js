import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GitHub from "../components/GitHub"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GitHub/>
  </Layout>
)

export default IndexPage
