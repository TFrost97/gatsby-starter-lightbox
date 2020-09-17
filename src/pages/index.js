import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Lightbox from '../components/Lightbox'

const IndexPage = ({ data }) => {
   
  return(<Lightbox images={data.allFile.edges} />)}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allFile {
      edges {
        node {
          id
          relativePath
          childImageSharp {
            id
            fluid(maxWidth: 1800, srcSetBreakpoints: [320, 480, 640, 800, 960, 1080, 1120, 1280, 1440, 1600, 1920]
    ) {
      ...GatsbyImageSharpFluid_withWebp

    
            }
          }
        }
      }
    }
  }
`
