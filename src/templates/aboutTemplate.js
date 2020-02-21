import AboutPageComponent from "../components/aboutTemplate";
import Layout from "../components/layout";
import React from "react";
import { checkPropTypes } from "prop-types";


const AboutPage = props => {
  const { pageContext } = props
  return (
    <Layout>
      {console.log(props)}
      <AboutPageComponent
        title={props.pageContext.title}
        body={props.pageContext.body}
        cover={props.pageContext.cover}
      />
    </Layout>
  )
}

export default AboutPage