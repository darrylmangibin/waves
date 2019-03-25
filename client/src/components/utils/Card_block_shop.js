import React from 'react';
import Card from '../utils/card';

const CardBlockShop = (props) => {

  const renderCard = () => {
    return props.list ? props.list.map((card) => {
      return (
          <Card 
            key={card._id}
            { ...card }
            grid={props.grid}
          />
      )
    }) : null
  }

  return (
    <div className="card_block_shop">
      <div>
        <div>
          {props.list ? 
            props.list.length === 0 ? (
              <div className="no_result">
                Sorry, no results
              </div>
            ) : null
          : null}
          { renderCard(props.list) }
        </div>
      </div>
    </div>
  )
}

export default CardBlockShop;