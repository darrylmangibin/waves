

export const validate = (element, formData=[]) => {
  let error = [true, ''];

  if(element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? `Must be a valid email`: ''}`;
    error = !valid ? [valid, message] : error;
  }

  if(element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? `This field is required`: ''}`;
    error = !valid ? [valid,message] : error;
  }

  return error
}

export const update = (element, formData, formName) => {
  const newFormdata = {
    ...formData
  }
  const newElement = {
    ...newFormdata[element.id]
  }

  newElement.value = element.e.target.value;

  if(element.blur) {
    let validData = validate(newElement, formData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }
  newElement.touched = element.blur
  newFormdata[element.id] = newElement;

  return newFormdata;
}

export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for(let key in formData){
    dataToSubmit[key] = formData[key].value;
  }

  return dataToSubmit;
}

export const isFormValid = (formData, formName) => {
  let formIsValid = true;

  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid;
  }
  return formIsValid;
}