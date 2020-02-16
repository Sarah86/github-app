import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import GitHub from "../components/GitHub"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GitHub/>
  </Layout>
)

export default IndexPage
