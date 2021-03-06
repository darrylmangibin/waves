import React from 'react';
import moment from 'moment';

const UserHistoryBlock = (props) => {

  const renderBlocks = () => {
    return props.products ? props.products.map((product, i) => {
      return (
        <tr key={i}>
          <td>{moment(product.date).format("MM-DD-YYYY")}</td>
          <td>{product.brand} {product.name}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
        </tr>
      )
    })
    : null
  }

  return (
    <div className="history_blocks">
      <table style={{display: 'inline-table'}}>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {renderBlocks()}
        </tbody>
      </table>
    </div>
  )
} 
export default UserHistoryBlock
