export function inputFocus(e) {
  const { target } = e;
  target.parentElement.querySelector('label').classList.add('focused');
}

export function inputBlur(e) {
  const { target } = e;
  if (target.value === '') {
    target.parentElement.querySelector('label').classList.remove('focused');
  }
}

export const correctFocus = (type, focusLabelNo) => {
  if (type === 'update') {
    document.querySelectorAll('label').forEach((label) => {
      label.classList.add('focused');
    });
  } else if (focusLabelNo) {
    document.querySelectorAll('label')[focusLabelNo].classList.add('focused');
  }
};
