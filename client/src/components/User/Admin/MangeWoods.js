import React, { Component } from 'react';
import FormField from '../../utils/Form/FormField';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/formActions';
import { connect } from 'react-redux';
import { getWoods, addWood} from '../../../actions/products_actions';

class MangeWoods extends Component {

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
          placeholder: 'Enter the Wood'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    }
  }

  componentDidMount() {
    this.props.dispatch(getWoods())
  }

  showCategoryItems = () => {
    return this.props.products.woods ?
      this.props.products.woods.map((item, i) => {
        return (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        )
      })
    : null
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'woods');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, 'woods');
    this.setState({
      formData: newFormData,
      formSuccess: true
    });
  }

  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'woods');
    let formIsValid = isFormValid(this.state.formData, 'woods');
    let existingWoods = this.props.products.woods

    if (formIsValid) {
      this.props.dispatch(addWood(dataToSubmit, existingWoods)).then((response) => {
        if(response.payload.success) {
          this.resetFieldsHandler()
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

  render() {
    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.showCategoryItems()}
            </div>
          </div>
          <div className="right">
            <form onSubmit={(e) => this.submitForm(e)}>
              <FormField 
                id={'name'}
                formData={this.state.formData.name}
                change={(element) => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className="error_label">
                  Please check your data
                </div>
              ) : null}
              <button onClick={(e) => this.submitForm(e)}>
                Add Wood
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(MangeWoods);
