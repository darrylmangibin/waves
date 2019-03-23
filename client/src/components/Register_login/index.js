import React from 'react';
import MyButton from '../utils/button';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customer</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque aut maiores cumque quos tempore necessitatibus reiciendis quam corrupti! Iste voluptates provident ipsum molestias corrupti atque deserunt voluptate qui. Labore, odit.</p>
            <MyButton 
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: '10px 0 0 0'
              }}
            />
          </div>
          <div className="right">
            <h2>Registered customers</h2>
            <p>If you have an account please log in.</p>
            LOGIN
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterLogin;