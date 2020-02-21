const path = require('path');
const _ = require('lodash');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
    promise.then(result => {
        if (result.errors) {
            throw result.errors;
        }
        return result;
    })

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    let slug;
    // Search for MDX filenodes
    if (node.internal.type === 'Mdx') {
        // If the frontmatter has a "slug", use it
        if (
            Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
            Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
        ) {
            slug = `/${_.kebabCase(node.frontmatter.slug)}`
        }
        // If not derive a slug from the "title" in the frontmatter
        else if (
            Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
            Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
        ) {
            slug = `/${_.kebabCase(node.frontmatter.title)}`
        }
        createNodeField({ node, name: 'slug', value: slug })
    }
    fmImagesToRelative(node);
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await wrapper(
        graphql(`
{
  allMarkdownRemark {
    edges {
      node {
        id
        htmlAst
        fileAbsolutePath
        frontmatter {
          title
          date
          cover {
            childImageSharp {
              id
              fluid {
                base64
                tracedSVG
                srcWebp
                srcSetWebp
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
    `)
    );

    const projectPosts = result.data.allMarkdownRemark.edges

    projectPosts.forEach((n, index) => {
        const next = index === 0 ? null : projectPosts[index - 1]
        const prev = index === projectPosts.length - 1 ? null : projectPosts[index + 1]
        if (n.node.fileAbsolutePath.indexOf('hiring') >= 0) {
            projectTemplate = require.resolve('./src/templates/hiringTemplate.js');
            slug = "/hiring/" + n.node.frontmatter.title.toLowerCase().split(" ").join("_");
        }
        else if (n.node.fileAbsolutePath.indexOf('groups') >= 0) {
            projectTemplate = require.resolve('./src/templates/groupsTemplate.js');
            slug = "/groups/" + n.node.frontmatter.title.toLowerCase().split(" ").join("_");;
        }
        else {
            projectTemplate = require.resolve('./src/templates/aboutTemplate.js');
            slug = n.node.frontmatter.title.toLowerCase().split(" ").join("_");
        }
        createPage({
            path: slug,
            component: projectTemplate,
            context: {
                title: n.node.frontmatter.title,
                cover: n.node.frontmatter.cover,
                slug: slug,
                body: n.node.htmlAst,
                date: n.node.frontmatter.date,
                absolutePathRegex: n.node.fileAbsolutePath,
            },
        })
    })
}
