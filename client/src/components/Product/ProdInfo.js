import React from 'react';
import MyButton from '../utils/button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdInfo = (props) => {

  const showProdTags = (detail) => {
    return (
      <div className="product_tags">
        {
          detail.shipping ? (
            <div className="tag">
              <div>
                <FontAwesomeIcon 
                  icon={faTruck}
                />
              </div>
              <div className="tag_text">
                <div>Free Shipping</div>
                <div>And return</div>
              </div>
            </div>
          ) : null
        }
          <div className="tag">
            <div>
              <FontAwesomeIcon 
                icon={detail.available ? faCheck : faTimes}
              />
            </div>
            <div className="tag_text">
              <div>{detail.available ? 'Available' : 'Not available'}</div>
              <div>{detail.available ? 'in store' : 'Pre order'}</div>
            </div>
          </div>
      </div>
    )
  }

  const showProdAction = (detail) => {
    return (
      <div className="product_actions">
        <div className="price">
          ${detail.price}
        </div>
        <div className="cart">
          <MyButton 
            type="add_to_cart_link"
            runAction={() => {
              console.log('add to cart')
            }}
          />
        </div>
      </div>
    )
  }

  const showProdSpecification = (detail) => {
    return (
      <div className="product_specification">
        <h2>Specifications:</h2>
        <div>
          <div className="item">
            <strong>Frets: {detail.frets}</strong>
          </div>
          <div className="item">
            <strong>Wood: {detail.wood.name}</strong>
          </div>
        </div>
      </div>
    )
  }

  const detail = props.detail
  return (
    <div>
      <h1>{detail.brand.name} {detail.name}</h1>
      <p>
        {detail.description}
      </p>
      { showProdTags(detail) }
      { showProdAction(detail) }
      { showProdSpecification(detail) }
    </div>
  )
}

export default ProdInfo
