import React, { Component } from 'react'

class ProdImg extends Component {

  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  }

  componentDidMount() {
    if(this.props.detail.images.length > 0) {
      let lightboxImages = [];

      this.props.detail.images.forEach((item) => {
        lightboxImages.push(item.url)
      })
      this.setState({
        lightboxImages
      })
    }
  }

  renderCardImage = (images) => {
    if(images.length > 0) {
      return images[0].url
    } else {
      return '/images/image_not_available.png'
    }
  }

  handleLightbox = () => {

  }

  showThumbs = (detail) => {
    return this.state.lightboxImages.map((item, i) => {
      return i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLightbox(i)}
          className="thumb"
          style={{background: `url(${item}) no-repeat`}}
        >
        
        </div>
      ) : null
    })
  }

  render() {
    const { detail } = this.props;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{background: `url(${this.renderCardImage(detail.images)}) no-repeat`}}
            onClick={() => {
              this.handleLightbox(0)
            }}
          >
          </div>
        </div>
        <div className="main_thumbs">
            { this.showThumbs(detail) }
        </div>
      </div>
    )
  }
}

export default ProdImg;
