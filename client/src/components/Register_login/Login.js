import React, { Component } from 'react'
import FormField from '../utils/Form/FormField';
import { update } from '../utils/Form/formActions';

import { connect } from 'react-redux';

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
        </form>
      </div>
    )
  }
}

export default connect()(Login);
