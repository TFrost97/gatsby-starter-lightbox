import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import Lightbox from '../components/Lightbox'
import styled from 'styled-components'
import Img from 'gatsby-image'


const IndexPage = ({ data }) => {

return (
<Lightbox data={data.allFile.edges} 
  renderImages={((handleClick, data) => (
    <Gallery>
      {data.map((img, i) => (
        <GalleryItem onClick={e => handleClick(e, i)} key={i} >
            {/* TODO: here display image with accurate resolution */}
            <Img fluid={img.node.childImageSharp.fluid} />
        </GalleryItem>
      ))}
    </Gallery>))} 

  renderModalImages={(selectedImage) =>  <Img fluid={data.allFile.edges[selectedImage].node.childImageSharp.fluid} />
}  />  )

// modal={(selectedImage) => <Img fluid={data.allFile.edges[selectedImage].node.childImageSharp.fluid} >{console.log(selectedImage)}</Img>
// }
  // return(<Lightbox><Gallery>{ data.allFile.edges.map((img, i ) => (

  //   <Img fluid={img.node.childImageSharp.fluid}/>))}</Gallery></Lightbox>)
  }

  const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1100px) {
    grid-template-columns: repeat(5, 1fr);
  }

  grid-gap: 15px;
  .gatsby-image-outer-wrapper {
    height: 100%;
  }
`

const GalleryItem = styled.div`
  position: relative;
`


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
