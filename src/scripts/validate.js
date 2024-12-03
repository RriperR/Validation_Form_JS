export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
      toggleButton(form, config);
    });

    addInputListners(form, config);
    toggleButton(form, config);
  });
};


const disableSubmit = (evt) => {
  evt.preventDefault();
}

const handleFormInput = (evt, config) => {
  const input = evt.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
}

const toggleButton = (form, config) => {
  const buttonSubmint = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmint.disabled = !isFormValid;
  buttonSubmint.classList.toggle('popup__button_disabled', !isFormValid);
}

const addInputListners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  inputList.forEach(function (item) {
    item.addEventListener('input', (evt) => {
      handleFormInput(evt, config);
    })
  });
}
