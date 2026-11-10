"use strict";
document.querySelectorAll('[data-toggle]').forEach(button => {
  button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.toggle);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.textContent = show ? 'Hide password' : 'Show password';
    button.setAttribute('aria-pressed', String(show));
  });
});
const form = document.querySelector('form');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');
function validatePasswords() {
  if (!confirm) return;
  const strong = /[a-z]/.test(password.value) && /[A-Z]/.test(password.value) && /[0-9]/.test(password.value) && /[^a-zA-Z0-9\s]/.test(password.value);
  password.setCustomValidity(password.value && !strong ? 'Include uppercase, lowercase, a number, and a symbol.' : '');
  confirm.setCustomValidity(confirm.value && confirm.value !== password.value ? 'Your passwords must match.' : '');
}
form.addEventListener('input', () => {
  validatePasswords();
  document.querySelector('.form-status').textContent = '';
});
form.addEventListener('submit', event => {
  event.preventDefault();
  validatePasswords();
  if (!form.reportValidity()) return;
  document.querySelector('.form-status').textContent = form.dataset.mode === 'register'
    ? 'Form validation passed. No account was created. AWS authentication will be connected in Milestone 2.'
    : 'Form validation passed. You are not signed in. AWS authentication will be connected in Milestone 2.';
  form.reset();
  validatePasswords();
  document.querySelectorAll('[data-toggle]').forEach(button => {
    document.getElementById(button.dataset.toggle).type = 'password';
    button.textContent = 'Show password';
    button.setAttribute('aria-pressed', 'false');
  });
});
