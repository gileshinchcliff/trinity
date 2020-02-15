module.exports = {
  siteMetadata: {
    title: `Trinity`,
    description: `Trinity Community Centre`,
    author: `@gileshinchcliff`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ["MAPS_API_KEY"]
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages/images`,
        name: "blog_images"
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        cropFocus: `CENTER`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              name: "blog_images"
            }
          },
          {
            resolve: `gatsby-plugin-netlify-cms-paths`,
            options: {
              cmsConfig: `/static/admin/config.yml`
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1080,

              linkImagesToOriginal: false,

            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              maintainCase: true,
              removeAccents: true,
            },
          },
          `gatsby-remark-images-zoom`,
          {
            resolve: `gatsby-plugin-favicon`,
            options: {
              logo: "./src/favicon.png",

              // WebApp Manifest Configuration
              appName: "Pop In", // Inferred with your package.json
              appDescription: "pop in community group",
              developerName: "gileshinchcliff",
              developerURL: null,
              dir: 'auto',
              lang: 'en-US',
              background: '#fff',
              theme_color: '#fff',
              display: 'standalone',
              orientation: 'any',
              start_url: '/?homescreen=1',
              version: '1.0',

              icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                yandex: false,
                windows: false
              }
            }
          }
        ],
      },
    },
    // {
    //   resolve: `gatsby-source-google-calendar-events`,
    //   options: {
    //     includedFields: ['start', 'end', 'summary', 'status', 'organizer', 'description', 'location', 'attachments', 'colourId'],
    //     pemFilePath: "/home/work/rebelastronaut/pemfile.json",
    //     calendarId: 'rebelastronaut.co.uk_kag7phpadv29hp0k3hdpmu0fs4@group.calendar.google.com',
    //     assumedUser: "giles@rebelastronaut.co.uk"
    //   }
    // },
    // {
    //   resolve: `gatsby-plugin-remote-images`,
    //   options: {
    //     nodeType: 'googleCalendarEvent',
    //     imagePath: 'nodes[].attachments[].fileUrl',
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/favicon.png`,
        name: `Trinity Community Centre`,
        short_name: `Trinity`,
        start_url: `/`,
        background_color: `#FE65B7`,
        theme_color: `#FE65B7`,
        display: `standalone`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    `gatsby-plugin-netlify-cms`,
    'gatsby-plugin-netlify-identity-widget',
    `gatsby-plugin-netlify-cms-paths`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
