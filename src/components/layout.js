import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from 'styled-components'
import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <Content>
        <link href="https://fonts.googleapis.com/css?family=Concert+One&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
        <script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Stuff>
          {children}
        </Stuff>
      </Content>
      <StyledFooter />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const Content = styled.div`
   width: 100%;
   min-height: 100vh;
   margin-bottom: -100px;
`

const Stuff = styled.div`
   margin-bottom: 100px;
`

const StyledFooter = styled(props => <Footer {...props} />)`
`