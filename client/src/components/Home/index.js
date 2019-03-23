import React from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../actions/products_actions';

class Home extends React.Component {

  componentDidMount() {
    this.props.dispatch(getProductsBySell())
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <HomeSlider />
        <HomePromotion />
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