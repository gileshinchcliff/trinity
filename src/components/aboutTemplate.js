import React from "react";
import styled from 'styled-components';
import BackgroundImg from 'gatsby-background-image';
import hastToHyperscript from "hast-to-hyperscript";

const renderHtmlToReact = node => {
    return hastToHyperscript(React.createElement, node);
};

export default class AboutPageComponent extends React.Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <ImgWrapper>
                        <BackgroundImg key={this.props.cover.childImageSharp.id} fadeIn={true} style={{ height: "100%", borderRadius: "20px" }} fluid={this.props.cover.childImageSharp.fluid}>
                            <Hero>
                                <TitleWrapper>
                                    {this.props.title}
                                </TitleWrapper>
                            </Hero>
                        </BackgroundImg>
                    </ImgWrapper>
                    <ContentWrapper>
                        <Content>
                            {renderHtmlToReact(this.props.body)}
                        </Content>
                    </ContentWrapper>
                </Wrapper>
            </div>
        )
    }
}


const Wrapper = styled.div`
  display: relative;
  height: auto;
  padding: 20px;
  width: 70%;
  padding-left: 15%;
`
const ImgWrapper = styled.div`
  display: relative;
  height: 50vh;
`


const TitleWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  top: 60%;
  text-align: center;
  color: white;
  font-family: 'Concert One', cursive;
  font-size: 6em;
  background-color: #62EDD6;
  border-radius: 20px;
  @media (max-width: 600px) {
    font-size: 4em;
  }
`

const ContentWrapper = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 30px;
`
const Hero = styled.div`
  display: block;
  height: 100%;
  font-size: .5em;
  padding: 20px;
`

const Content = styled.div`
  padding-bottom: 100px;
`