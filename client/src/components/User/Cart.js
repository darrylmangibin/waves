import React, { Component } from 'react';
import UserLayout from '../../hoc/user';
import { connect } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user_action';

import FontawesomeIcon from '@fortawesome/react-fontawesome';
import fafrown from  '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';

import UserProductBlock from '../utils/User/ProductBlock';
import Paypal from '../utils/paypal';

  // AeMG9md3Y5XSBEihJvSAiXSzhd__7woyTWcFzr3qffA-ZNY4LvijJ_UM_Xe7tSpSF9b6heZ8euOEOmSP

class Cart extends Component {

  state = {
    loading: true,
    total: 0,
    showSuccess: false,
    showTotal: false
  }

  componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    if(user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach((item) => {
          cartItems.push(item.id)
        });
        this.props.dispatch(getCartItems(cartItems, user.userData.cart)).then(() => {
          if(this.props.user.cartDetail.length > 0) {
            this.calculateTotal(this.props.user.cartDetail)
          }
        })
      }
    }
  }

  showNoItemMessage = () => {
    return (
      <div className="cart_no_items">
        <FontawesomeIcon 
          icon={fafrown}
        />
        <div>
          You have no items
        </div>
      </div>
    )
  }

  calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.forEach((item) => {
      total += parseInt(item.price, 10) * item.quantity
    })
    this.setState({
      total,
      showTotal: true
    })
  }
  removeFromCart = (id) => {
    this.props.dispatch(removeCartItem(id)).then((response) => {
      if(this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        })
      } else {
        this.calculateTotal(this.props.user.cartDetail)
      }
    })
  }

  transactionError = (data) => {
    console.log('Paypal error')
  }

  transactionCancel = () => {
    console.log('Transaction Cancelled')
  }

  transactionSuccess = (data) => {
    this.props.dispatch(onSuccessBuy({
      cartDetail: this.props.user.cartDetail,
      paymentData: data
    })).then(() => {
      if(this.props.user.successBuy) {
        this.setState({
          showTotal: false,
          showSuccess: true
        })
      }
    })
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className="user_cart">
            <UserProductBlock 
              products={this.props.user}
              type="cart"
              removeItem={(id) => this.removeFromCart(id)}
            />
            { this.state.showTotal ? (
              <div>
                <div className="user_cart_sum">
                  <div>
                    Total amount: ${this.state.total}
                  </div>
                </div>
              </div>
            ) :
              this.state.showSuccess ? (
                <div className="cart_success">
                  <FontawesomeIcon 
                    icon={faSmile}
                  />
                  <div>
                    Thank You
                  </div>
                  <div>
                    Your Order Now Complete
                  </div>
                </div>
              )

              : 
              this.showNoItemMessage()
            }
          </div>
          {
            this.state.showTotal ? (
              <div className="paypal_button_container">
                <Paypal 
                  toPay={this.state.total}
                  transactionError={(data) => this.transactionError(data)}
                  transactionCancel={(data) => this.transactionCancel(data)}
                  onSuccess={(data) => this.transactionSuccess(data)}
                />
              </div>
            )

            : null
          }
        </div>
      </UserLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Cart);