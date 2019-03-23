import React, { Component } from 'react'
import FormField from '../utils/Form/FormField';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_action';

class Login extends Component {

  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter you email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter you password'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    
    let dataToSubmit = generateData(this.state.formData, 'login');
    let formIsValid = isFormValid(this.state.formData, 'login');

    if(formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
        if(response.payload.loginSuccess) {
          this.props.history.push('/user/dashboard')
        } else {
          this.setState({
            formError: true
          })
        }
      })
    } else {
      this.setState({
        formError: true
      })
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'login')
    this.setState({
      formError: false,
      formData:newFormdata
    })
  }

  render() {
    return (
      <div  className="signin_wrapper">
        <form onSubmit={(e) => this.submitForm(e)}>
          <FormField 
            id={'email'}
            formData={this.state.formData.email}
            change={(element) => this.updateForm(element)}
          />
          <FormField 
            id={'password'}
            formData={this.state.formData.password}
            change={(element) => this.updateForm(element)}
          />
          {this.state.formError ? (
            <div className="error_label">
              Please check your data
            </div>
          ) : null}
          <button onClick={(e) => this.submitForm(e)}>
            Log in
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(withRouter(Login));
