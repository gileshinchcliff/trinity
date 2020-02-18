import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import styled from 'styled-components';
import BackgroundImg from 'gatsby-background-image';
import { ExpandMoreRounded } from '@material-ui/icons';
import { Clear, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Img from 'gatsby-image'


export default class BlogTemplate extends React.Component {
    state = {
        showLightbox: false,
        selectedImage: 0,
        gallerylength: 0,
    }

    componentDidMount = () => {
        this.retreiveGalleryLength()
        window.addEventListener('keyup', this.handleKeyUp, false)
        this.targetElement = document.querySelector('#targetElementId');

    }

    componentWillUnmount = () => {
        window.removeEventListener('keyup', this.handleKeyUp, false)
        clearAllBodyScrollLocks();
    }

    retreiveGalleryLength = () => {
        this.props.data.allMarkdownRemark.edges.map(
            (post, i) => {
                this.setState(
                    {
                        gallerylength: post.node.frontmatter.gallery.length
                    }
                );
            }
        );
    };

    handleClick = (e, index) => {
        e.preventDefault()
        this.setState({ showLightbox: !this.state.showLightbox, selectedImage: index });
        disableBodyScroll(this.targetElement);
    };

    closeModal = () => {
        this.setState({ showLightbox: false })
        enableBodyScroll(this.targetElement);
    }

    goBack = () => {
        if (this.state.selectedImage > 0) {
            this.setState({ selectedImage: this.state.selectedImage - 1 })
        }
    }

    goForward = () => {
        if (this.state.selectedImage < this.state.gallerylength - 1) {
            this.setState({ selectedImage: this.state.selectedImage + 1 })
        }
    }

    handleKeyUp = e => {
        e.preventDefault()
        const { keyCode } = e
        if (this.state.showLightbox) {
            if (keyCode === 37) {
                // Left Arrow Key
                if (this.state.selectedImage > 0) {
                    this.setState({ selectedImage: this.state.selectedImage - 1 })
                }
            }
            if (keyCode === 39) {
                // Right Arrow Key
                if (this.state.selectedImage < this.state.gallerylength - 1) {
                    this.setState({ selectedImage: this.state.selectedImage + 1 })
                }
            }
            if (keyCode === 27) {
                // Escape key
                this.setState({ showLightbox: false })
                enableBodyScroll(this.targetElement);
            }
        }
    }

    render() {
        const { showLightbox, selectedImage } = this.state
        return (
            <Layout>
                <Wrapper>
                    {this.props.data.allMarkdownRemark.edges.map(
                        (post, i) => {
                            const images = post.node.frontmatter.gallery
                            return (
                                <div>
                                    <ImgWrapper>
                                        <BackgroundImg key={post.node.frontmatter.cover.childImageSharp.id} fadeIn={true} style={{ height: "50vh", borderRadius: "20px" }} fluid={post.node.frontmatter.cover.childImageSharp.fluid}>
                                            <Hero>
                                                <TitleWrapper>
                                                    {post.node.frontmatter.title}
                                                    <ExpandMoreRounded style={{ display: "block", fontSize: "1em", textAlign: "center", width: "98%" }} />
                                                </TitleWrapper>
                                            </Hero>
                                        </BackgroundImg>
                                    </ImgWrapper>
                                    <Gallery>
                                        {post.node.frontmatter.gallery.map((img, i) => {
                                            return (
                                                <GalleryItem key={img.image.childImageSharp.id}>
                                                    <a href={img.image.childImageSharp.fluid.src} onClick={e => this.handleClick(e, i)}>
                                                        <Img fluid={img.image.childImageSharp.fluid} />
                                                    </a>
                                                </GalleryItem>
                                            )
                                        })}
                                    </Gallery>
                                    <LightboxModal visible={showLightbox} onKeyUp={e => this.handleKeyDown(e)}>
                                        <LightboxContent>
                                            <Img imgStyle={{ objectFit: 'contain' }} fluid={images[selectedImage].image.childImageSharp.fluid} style={{ maxHeight: "80vh", maxWidth: "80vw" }} />
                                            <Controls>
                                                <KeyboardArrowLeft onClick={this.goBack} disabled={selectedImage === 0} style={{ display: "block", color: "white", fontSize: "50px" }} />
                                                <Clear onClick={this.closeModal} style={{ display: "block", color: "white", fontSize: "50px" }} />
                                                <KeyboardArrowRight onClick={this.goForward} disabled={selectedImage === images.length - 1} style={{ display: "block", color: "white", fontSize: "50px" }} />
                                            </Controls>
                                        </LightboxContent>
                                    </LightboxModal>
                                    <ContentWrapper>
                                        <Date>{post.node.frontmatter.date}</Date>
                                        <Content
                                            dangerouslySetInnerHTML={{ __html: post.node.html }}
                                        />
                                    </ContentWrapper>
                                </div>
                            )
                        }
                    )}
                </Wrapper>
            </Layout>
        )
    }
}

export const pageQuery = graphql`
query($absolutePathRegex: String!)
{
  allMarkdownRemark(filter: {fileAbsolutePath: {eq: $absolutePathRegex}}) {
    edges {
      node {
        id
        html
        frontmatter {
          date(formatString: "DD-MM-YYYY")
          title
          gallery {
            image {
              absolutePath
              id
              name
              childImageSharp {
                fluid {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                  presentationWidth
                  presentationHeight
                }
              }
            }
          }
          cover {
            id
            name
            childImageSharp {
              fluid {
                base64
                tracedSVG
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
                originalImg
                originalName
                presentationWidth
                presentationHeight
              }
            }
          }
        }
      }
    }
  }
}

`

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
  padding: 20px;
`

const TitleWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 70px;
  top: 60%;
  text-align: center;
  color: white;
  font-family: 'Concert One', cursive;
  font-size: 5em;
  background-color: #62EDD6;
  border-radius: 20px;
  @media (max-width: 600px) {
    font-size: 3em;
  }
`

const ContentWrapper = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 30px;
`

const Content = styled.div`
  flex: 1 0 auto;
`

const Hero = styled.div`
  display: block;
  height: 100%;
  font-size: .5em;
  padding: 20px;
`
const Date = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
`
const Gallery = styled.div`
  width: 100%;
  min-height: 50px;
  border-radius: 20;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const GalleryItem = styled.div`
  padding: 10px;
  min-width: 100px;
  width: 15%;
  flex-shrink: 1;
  border-radius: 20;
`

const LightboxModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`
const LightboxContent = styled.div`
  margin: 30px;
  max-width: 1500px;
  width: 100%;
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`