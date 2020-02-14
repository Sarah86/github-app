import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Box from '@material-ui/core/Box';
import HudlApp from "../components/Map"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Search for a place</h1>
    <HudlApp/>
  </Layout>
)

export default IndexPage
