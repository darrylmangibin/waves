import React, { Component } from 'react';
import FormField from '../../utils/Form/FormField';
import { update, generateData, isFormValid, populateFields } from '../../utils/Form/formActions';
import { connect } from 'react-redux';

class UpdateSiteInfo extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Address',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter the site address'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'Working hours',
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter the site working hours'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'Phone Number',
          name: 'phone_input',
          type: 'text',
          placeholder: 'Enter the phone number'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Shop Email',
          name: 'phone_input',
          type: 'text',
          placeholder: 'Enter the Shop email address'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'site_info');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'site_info');
    let formIsValid = isFormValid(this.state.formData, 'site_info');

    if (formIsValid) {
      
    } else {
      this.setState({
        formError: true
      })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.submitForm(e)}>
          <h1>Site Info</h1>
          <FormField 
              id={'address'}
              formData={this.state.formData.address}
              change={(element) => this.updateForm(element)}
            />
            <FormField 
              id={'hours'}
              formData={this.state.formData.hours}
              change={(element) => this.updateForm(element)}
            />
            <FormField 
              id={'phone'}
              formData={this.state.formData.phone}
              change={(element) => this.updateForm(element)}
            />
            <FormField 
              id={'email'}
              formData={this.state.formData.email}
              change={(element) => this.updateForm(element)}
            />
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
              Update
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(UpdateSiteInfo);
