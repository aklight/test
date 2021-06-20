const showInputError = (formElement, input, validationConfing) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  input.classList.add(validationConfing.inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(validationConfing.errorClass);
};

const hideInputError = (formElement, input, validationConfing) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  input.classList.remove(validationConfing.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfing.errorClass);
};

const validateInput = (formElement, input, validationConfing) => {
  if (input.validity.valid) {
    hideInputError(formElement, input, validationConfing);
  } else {
    showInputError(formElement, input, validationConfing);
  }
};

const hasInvalidInput = (inputs) => {
  return Array.from(inputs).some((input) => {
    return !input.validity.valid;
  });
};

const toggleButton = (button, validationConfing, inputs) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add(validationConfing.inactiveButtonClass);
    button.disabled = true;
  }
  else {
    button.classList.remove(validationConfing.inactiveButtonClass);
    button.disabled = false;
  }
};

const inputListeners = (formElement, validationConfing) => {
  const inputs = formElement.querySelectorAll(validationConfing.inputSelector);
  const button = formElement.querySelector(validationConfing.submitButtonSelector);
  toggleButton(button, validationConfing, inputs);
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validateInput(formElement, input, validationConfing);
      toggleButton(button, validationConfing, inputs);
    });
  });
};

const enableValidation = (validationConfing) => {
  const forms = document.querySelectorAll(validationConfing.formSelector);
  forms.forEach(formElement => {
    formElement.addEventListener('submit', preventFormSubmit);
    inputListeners(formElement, validationConfing);
    });
};

function preventFormSubmit(evt) {
  evt.preventDefault();
};

enableValidation(confing);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
