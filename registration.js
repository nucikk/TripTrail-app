'use strict'

//*--------------- რეგისტრაცის გვერიდის ინპუტების ვალიდაცია
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#registrationForm');
    const fullNameInput = document.querySelector('#fullName');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const fullNameError = document.querySelector('#fullNameError');
    const emailError = document.querySelector('#emailError');
    const passwordError = document.querySelector('#passwordError');
    const phoneInput = document.querySelector('#phone');
    const phoneError = document.querySelector('#phoneError');
    const successContainer = document.querySelector('#successContainer');
    const continueButton = document.querySelector('#continueButton');
    let isFormSubmitted = false;
    const phonePattern = /^(\+?995\s?|0)\d{9}$/;
  
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const fullName = fullNameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const phoneValue = phoneInput.value.trim();
  
      //* validate Full Name (შეამოწმებს სახელი არის თუ არა (!fullName) ან გამოიტანს შესაბამის ერორ მესიჯს)  
      if (!fullName) {
        showError(fullNameError, 'Full Name is required');
      } else {
        hideError(fullNameError);
      }
  
      //* validate Email Format (შეამოწმებს ემაილ ინპუტს აი დაიბეჭდოს ცარიელი ან არასწორი ფორმაატის მქონე ემაილი)
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!email) {
        showError(emailError, 'Email is required');
      } else if (!emailPattern.test(email)) {
        showError(emailError, 'Invalid email format');
      } else {
        hideError(emailError);
      }
  
      //* validate Password (შეამწმებს რომ არ გაიგზავნოს ცარიელი ინპუტი, ასევე ერორ მესიჯები იმის მიხედვით თუ რომელ პირობას არ აკმაყოფილებს ინპუთი)
      const pasUpperCase = /[A-Z]/.test(password);
      const pasLowerCase = /[a-z]/.test(password);
      const passNumber = /[0-9]/.test(password);
      const passSymbol = /[._*@^,&-]/.test(password);
      const phonePattern = /^(\+?995\s?|0)\d{9}$/;
  
      //* თუ რომელიმე პირობა იქნება true ამ შემთხევაში არ გამოიტანს კონკრეტულად იმ ერორს რომელიც ჭეშმარიტია და დაბეჭდავს მხოლოდ falseს
      const unmetConditions = [];
      if (!pasUpperCase) unmetConditions.push('at least 1 uppercase letter');
      if (!pasLowerCase) unmetConditions.push('1 lowercase letter');
      if (!passNumber) unmetConditions.push('1 number');
      if (!passSymbol) unmetConditions.push('1 symbol (._*@-)');
  
      if (!password) {
        showError(passwordError, 'Password is required');
      } else if (unmetConditions.length === 0) {
        hideError(passwordError);
      } else {
        const errorMessage = 'Password must include ' + unmetConditions.join(', ');
        showError(passwordError, errorMessage);
      }
  
      // validate phone number
      if (!phoneValue) {
        showError(phoneError, 'Phone number is required');
      } else if (!phonePattern.test(phoneValue)) {
        showError(phoneError, 'Georgian number format (9 digits)');
      } else {
        hideError(phoneError);
      }
      formatAndSetPhone(phoneInput, phoneValue);
      //* შეამოწმებს თუ ყველა ინპუტი იქნება ჭეშმარიტი გამოიტანს SuccessMessage-ს
      if (!fullNameError.textContent && !emailError.textContent && !passwordError.textContent && !phoneError.textContent) {
        if (!isFormSubmitted) {
          isFormSubmitted = true;
          showSuccessMessage();
        }
      }
    });
    //* როდესაც იუზერი ჩაწერს ერთ ციფრს მაინც გამოჩნდება ქართული ნომრის კოდი
phoneInput.addEventListener('input', (event) => {
    let inputValue = event.target.value.trim();

    inputValue = inputValue.replace(/\D/g, '');

    if (/^\d+$/.test(inputValue)) {
      if (inputValue.length >= 9) {
        const formattedNumber = '995 ' + inputValue.substring(inputValue.length - 9);
        event.target.value = formattedNumber;
      } else {
        event.target.value = inputValue;
      }
    } else {
      event.target.value = '';
    }
  });

  
  
    //* Function to show the success message
    function showSuccessMessage() {
      successContainer.style.display = 'block';
  
    }
    //* add event listener to the "Continue" button
    continueButton.addEventListener('click', (event) => {
      event.preventDefault();
  
      const fullName = fullNameInput.value;
      localStorage.setItem('fullName', fullName);
  
      const usernameSpan = document.querySelector('#username');
      if (usernameSpan) {
        usernameSpan.textContent = fullName;
      }
  
      setTimeout(() => {
        console.log('Continue button clicked');
        window.location.href = './account.html';
      }, 100);
    });
  
    function showError(element, message) {
      element.textContent = message;
      element.style.display = 'block';
    }
  
    function hideError(element) {
      element.textContent = '';
      element.style.display = 'none';
    }
  
    function formatAndSetPhone(inputElement, phoneValue) {
      inputElement.value = phoneValue;
    }
  
  });
  
  
  // Password icon visibility toggle
  const passToggleVisibility = () => {
    const passwordInput = document.querySelector('#password');
    const togglePasswordIcon = document.querySelector('#togglePassword');
  
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordIcon.src = '../image/view.png';
    } else {
      passwordInput.type = 'password';
      togglePasswordIcon.src = '../image/hide.png';
    }
  };
  