/* eslint-disable no-plusplus,import/prefer-default-export */
export const validate = (formEl) => {
  const formLength = formEl.length;

  if (formEl.checkValidity() === false) {
    for (let i = 0; i < formLength; i++) {
      const elem = formEl[i];
      const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
        if (!elem.validity.valid) errorLabel.textContent = elem.validationMessage;
        else errorLabel.textContent = '';
      }
    }

    return false;
  }


  for (let i = 0; i < formLength; i++) {
    const elem = formEl[i];
    const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
    if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
      errorLabel.textContent = '';
    }
  }

  return true;
};
