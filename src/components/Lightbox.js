import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image'

class Lightbox extends Component {
  state = {
    showLightbox: false,
    selectedImage: 0,
  }

  componentDidMount = () => {
    window.addEventListener('keyup', this.handleKeyUp, false)
  }

  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleKeyUp, false)
  }

  handleClick = (e, index) => {
    e.preventDefault()
    this.setState({
      showLightbox: !this.state.showLightbox,
      selectedImage: index,
    })
  }

  closeModal = () => {
    this.setState({ showLightbox: false })
  }

  goBack = () => {
    this.setState({ selectedImage: this.state.selectedImage - 1 })
  }

  goForward = () => {
    this.setState({ selectedImage: this.state.selectedImage + 1 })
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
        if (this.state.selectedImage < this.props.data.length - 1) {
          this.setState({ selectedImage: this.state.selectedImage + 1 })
        }
      }
      if (keyCode === 27) {
        // Escape key
        this.setState({ showLightbox: false })
      }
    }
  }

  render() {
    const { data } = this.props
    const { showLightbox, selectedImage } = this.state
    return (
      <Fragment>

        {this.props.renderImages(this.handleClick, data)}
        {console.log(this.props, "propsy")}


        <LightboxModal
          visible={showLightbox}
          onKeyUp={e => this.handleKeyDown(e)}
        >
          <LightboxContent>
            {/* TODO: here display full size image */}
            {console.log(selectedImage, "selected")}
            {/* <Img fluid={images[selectedImage].node.childImageSharp.fluid} /> */}
            {this.props.renderModalImages(selectedImage)}
            <Controls>
              <Button onClick={this.closeModal}>x</Button>
              <LeftRight>
                <Button onClick={this.goBack} disabled={selectedImage === 0}>
                  {"<"}
                </Button>
                <Button
                  onClick={this.goForward}
                  disabled={selectedImage === data.length - 1}
                >
                  {">"}
                </Button>
              </LeftRight>
            </Controls>
          </LightboxContent>
        </LightboxModal>
      </Fragment>
    )
  }
}

const StyledImg = styled(Img)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 100%; // or whatever
  & > img {
    object-fit: cover !important; // or whatever
    object-position: 0% 0% !important; // or whatever
  }
`






const Button = styled.button``

const LightboxModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`
const LightboxContent = styled.div`
  margin: 15px;
  max-width: 700px;
  width: 100%;
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftRight = styled.div`
  button:first-child {
    margin-right: 10px;
  }
`

Lightbox.propTypes = {
  renderImages: PropTypes.isRequired,
  renderModalImages: PropTypes.isRequired,
  data: PropTypes.isRequired
}

export default Lightbox
