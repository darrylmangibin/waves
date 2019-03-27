import React from 'react'

const PageTop = (props) => {
  return (
    <div className="page_top">
      <div className="container"
        style={{padding: '0 20px'}}
      >
        {props.title}
      </div>
    </div>
  )
}

export default PageTop;
