import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { connect } from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../actions/products_actions';
import ProdInfo from './ProdInfo';
import ProdImg from './ProdImg';
import { addToCart } from '../../actions/user_action';
 
class ProductPage extends Component {

  componentDidMount(){
    const id = this.props.match.params.id;
    
    this.props.dispatch(getProductDetail(id)).then(res => {
      if(!this.props.products.prodDetail) {
        this.props.history.push('/')
      }
    })
  }

  componentWillMount(){
    this.props.dispatch(clearProductDetail())
  }

  addToCartHandler = (id) => {
    this.props.dispatch(addToCart(id))
  }

  render() {
    return (
      <div>
        <PageTop 
          title="Product Detail"
        />
        <div className="container">
          {
            this.props.products.prodDetail ? (
              <div className="product_detail_wrapper">
                <div className="left">
                  <div style={{width: '320px'}}>
                    <ProdImg 
                      detail={this.props.products.prodDetail}
                    />
                  </div>
                </div>
                <div className="right">
                  <ProdInfo 
                    addToCart={(id) => this.addToCartHandler(id)}
                    detail={this.props.products.prodDetail}
                  />
                </div>
              </div>
            )
            : 'Loading'
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(ProductPage);
