import React from 'react';
import UserLayout from '../../../hoc/user';
import FormField from '../../utils/Form/FormField';
import { update, generateData, isFormValid, populateOptionField,
resetFields } from '../../utils/Form/formActions';
import FileUpload from '../../utils/Form/FileUpload';

import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/products_actions';

class AddProduct extends React.Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter your description'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter your price'
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product Brand',
          name: 'brands_input',
          options: []
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [
            {
              key: true,
              value: 'Yes'
            },
            {
              key:true,
              value:'No'
            }
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available in stock',
          name: 'available_input',
          options: [
            {
              key: true,
              value: 'Yes'
            },
            {
              key: true,
              value: 'No'
            }
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood material',
          name: 'wood_input',
          options: [
            {
              key: true,
              value: 'Yes'
            },
            {
              key: true,
              value: 'No'
            }
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'Frets',
          name: 'frets_input',
          options: [
            {
              key: 20,
              value: 20
            },
            {
              key: 21,
              value: 21
            },
            {
              key: 22,
              value: 22
            },
            {
              key: 23,
              value: 23
            },
            {
              key: 24,
              value: 24
            }
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [{
              key: true,
              value: 'Public'
            },
            {
              key: false,
              value: 'Hidden'
            }
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showLabel: false
      }
    }
  }

   updateFields = (newFormData) => {
    this.setState({
      formData: newFormData
    })
   }

   resetFieldsHandler = () => {
     const newFormData = resetFields(this.state.formData, 'products');
     this.setState({
       formData: newFormData,
       formSuccess: true
     });
     setTimeout(() => {
       this.setState({
         formSuccess: false
       }, ()=> {
         this.props.dispatch(clearProduct())
       })
     }, 2000);
   }

   updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'products');
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }

  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'products');
    let formIsValid = isFormValid(this.state.formData, 'products');

    if (formIsValid) {
      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if(this.props.products.addProduct.success) {
          this.resetFieldsHandler()
        } else {
          this.setState({
            formError:true
          })
        }
      })
    } else {
      this.setState({
        formError: true
      })
    }
  }

  componentDidMount() {
    const formData = this.state.formData;

    this.props.dispatch(getBrands()).then(response => {
      const newFormData = populateOptionField(formData, this.props.products.brands, 'brand')
      this.updateFields(newFormData);
    })

    this.props.dispatch(getWoods()).then(response => {
      const newFormData = populateOptionField(formData, this.props.products.woods, 'wood')
      this.updateFields(newFormData);
    })
  }

  imagesHandler = (images) => {
    const newFormData = {
      ...this.state.formData
    }
    newFormData['images'].value = images;
    newFormData['images'].valid = true;
    this.setState({
      formData: newFormData
    })
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Product</h1>
          <form onSubmit={(e) => this.submitForm(e)}>
            <FileUpload 
              imagesHandler={(images) => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />
            <FormField 
              id={'name'}
              formData={this.state.formData.name}
              change={(element) => this.updateForm(element)}
            />
            <FormField 
              id={'description'}
              formData={this.state.formData.description}
              change={(element) => this.updateForm(element)}
            />
            <FormField 
              id={'price'}
              formData={this.state.formData.price}
              change={(element) => this.updateForm(element)}
            />
            <div className="form_devider"></div>
            <FormField 
              id={'brand'}
              formData={this.state.formData.brand}
              change={(element) => this.updateForm(element)}
            />
            <FormField 
              id={'shipping'}
              formData={this.state.formData.shipping}
              change={(element) => this.updateForm(element)}
            />
            <FormField 
              id={'available'}
              formData={this.state.formData.available}
              change={(element) => this.updateForm(element)}
            />
            <div className="form_devider"></div>
            <FormField 
              id={'wood'}
              formData={this.state.formData.wood}
              change={(element) => this.updateForm(element)}
            />
            <FormField 
              id={'frets'}
              formData={this.state.formData.frets}
              change={(element) => this.updateForm(element)}
            />
            <div className="from_devider"></div>
            <FormField 
              id={'publish'}
              formData={this.state.formData.publish}
              change={(element) => this.updateForm(element)}
            />
            { this.state.formSuccess ? (
              <div className="form_success">
                Success..
              </div>
            ):null}
            {this.state.formError ? (
              <div className="error_label">
                Please check your data
              </div>
            ) : null}
            <button onClick={(e) => this.submitForm(e)}>
              Add product
            </button>
          </form>
        </div>
      </UserLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AddProduct);