import React, { Component } from 'react';
import FormField from '../utils/Form/FormField';
import { connect } from 'react-redux';
import { update, generateData, isFormValid, populateFields } from '../utils/Form/formActions';

class UpdatePersonalInfo extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter you name'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          lastname: 'lastname_input',
          type: 'text',
          placeholder: 'Enter you lastname'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
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
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'update_user');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }
  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'update_user');
    let formIsValid = isFormValid(this.state.formData, 'update_user');

    if (formIsValid) {
      console.log(dataToSubmit)
    } else {
      this.setState({
        formError: true
      })
    }
  }

  componentDidMount() {
    const newFormData = populateFields(this.state.formData, this.props.user.userData);

    this.setState({
      formData: newFormData
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.submitForm(e)}>
          <h2>Personal Information</h2>
          <div className="form_block_two">
            <div className="block">
              <FormField 
                id={'name'}
                formData={this.state.formData.name}
                change={(element) => this.updateForm(element)}
              />
            </div>
            <div className="block">
              <FormField 
                id={'lastname'}
                formData={this.state.formData.lastname}
                change={(element) => this.updateForm(element)}
              />
            </div>
          </div>
          <div>
            <FormField 
              id={'email'}
              formData={this.state.formData.email}
              change={(element) => this.updateForm(element)}
            />
          </div>
          <div>
          {
            this.state.formSuccess ? (
              <div className="form_success">
                Success
              </div>
            )
            : null
          }
            {this.state.formError ? (
              <div className="error_label">
                Please check your data
              </div>
            ) : null}
            <button onClick={(e) => this.submitForm(e)}>
              Update Person Info
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UpdatePersonalInfo);