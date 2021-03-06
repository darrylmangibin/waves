import React from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../actions/products_actions';
import CardBlock from '../utils/card_blocks';

class Home extends React.Component {

  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival())
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock 
          list={this.props.products.bySell}
          title="Best Selling guitar"
        />
        <HomePromotion />
        <CardBlock 
          list={this.props.products.byArrival}
          title="New Arrivals"
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Home);