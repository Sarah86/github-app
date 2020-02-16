import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Box from '@material-ui/core/Box';
import HudlApp from "../components/Map"
import ApiTest from "../components/ApiTest"
import PlacesApi from "../components/Places"
import TwitterApp from "../components/Twitter"
import GitHub from "../components/GitHub"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    {/* <HudlApp/>
    <ApiTest/>
    <PlacesApi/> */}
    {/* <TwitterApp/> */}
    <GitHub/>
  </Layout>
)

export default IndexPage
