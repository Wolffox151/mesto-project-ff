export { enableValidation, clearValidation }

const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`)
  inputElement.classList.add(`${inputErrorClass}`)
  errorElement.textContent = errorMessage
  errorElement.classList.add(`${errorClass}`)
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`)
  inputElement.classList.remove(`${inputErrorClass}`)
  errorElement.classList.remove(`${errorClass}`)
  errorElement.textContent = ''
}

const checkInputVadility = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.dataset.errorMessage)
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)
}

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};



const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
if (hasInvalidInput(inputList)) {
    formElement.querySelector(`${submitButtonSelector}`).classList.add(inactiveButtonClass)
    formElement.querySelector(`${submitButtonSelector}`).disabled = true;
  }
  else {
    formElement.querySelector(`${submitButtonSelector}`).classList.remove(inactiveButtonClass)
    formElement.querySelector(`${submitButtonSelector}`).disabled = false;
  }
}

const setEventListeners = (formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass) => {
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`))
  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
    checkInputVadility(formElement, inputElement, inputErrorClass, errorClass)
    toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
    })
  })
}

const enableValidation = (validateParams) => {
  const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = validateParams

  const formList = Array.from(document.querySelectorAll(`${formSelector}`))
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(formElement, inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass)
  })
}

const clearValidation = (formElement, validationconfig) => {
  const inputList = Array.from(formElement.querySelectorAll(`${validationconfig.popupInputSelector}`))
  inputList.forEach((inputElement) => {
    checkInputVadility(formElement, inputElement, validationconfig.popupInputErrorClass, validationconfig.popupLabelErrorVisibleClass)
    hideInputError(formElement, inputElement, validationconfig.popupInputErrorClass, validationconfig.popupLabelErrorVisibleClass)
  })
  toggleButtonState(formElement, inputList, validationconfig.popupButtonSelector, validationconfig.popupButtonDisabledClass)
}