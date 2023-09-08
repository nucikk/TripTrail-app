"use strict"

//! --- ► ფუნქციონალი: navbar-ის ფონის ფერი შეიცვლება როცა მომხამრებელი ჩამოსქროლავს 
const navbar = document.querySelector('.navbar');
const scrollBar = 100;

window.addEventListener('scroll', (e) => {
  e.preventDefault();
  if (window.scrollY > scrollBar) {
    navbar.style.backgroundColor = '#0000006c';
  } else {
    navbar.style.backgroundColor = 'transparent';
  }
});


//! --- ► 1.სანავიგაციო მენიუ, რომელიც აჩვენებს ბურგერის აიქონს პატარა ეკრანებზე და სრულ მენიუს დიდ ეკრანებზე
//! --- ► 2.დინამიურად ამატებს მენიუს Sign Up & Login ბმულებს, როდესაც ეკრანის სიგანე 820px ქვემოთაა ამატებს, თუ 820ზე მეტია აშორებს მათ 
//! --- ► 3.toggle the menu visibility- burger აიქონზე დაჭერით გამოჩდეს მენიუ & close აიქონზე დაიხუროს
document.addEventListener("DOMContentLoaded", () => {
  const burgerIcon = document.querySelector("#burgerIcon")
  const closeIcon = document.querySelector("#closeIcon")
  const navList = document.querySelector(".nav_list")

  //* Function to create list items
  const createListItem = (text, link) => {
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");
    anchor.setAttribute("href", link);
    anchor.textContent = text;
    listItem.appendChild(anchor);
    return listItem;
  };

  //* create "Sign Up" and "Login" list items
  const signUpListItem = createListItem("Sign Up", "./page/registracion.html");
  const loginListItem = createListItem("Login", "./page/registracion.html");

  //* function to toggle the menu
  const toggleMenu = () => {
    const isMobile = window.innerWidth <= 820;

    //* display/hide burger and close icons 820px screen size
    burgerIcon.style.display = isMobile ? "inline-block" : "none";
    closeIcon.style.display = "none"


    navList.classList.toggle("active", !isMobile);

    //* append/remove "Sign Up" and "Login" list items
    if (isMobile) {
      if (!navList.contains(signUpListItem)) {
        navList.appendChild(signUpListItem);
      }
      if (!navList.contains(loginListItem)) {
        navList.appendChild(loginListItem);
      }
    } else {
      if (navList.contains(signUpListItem)) {
        signUpListItem.remove();
      }
      if (navList.contains(loginListItem)) {
        loginListItem.remove();
      }
    }
  };

  toggleMenu();

  window.addEventListener("resize", toggleMenu);

  //* add click event burger icon - for toggling menu
  burgerIcon.addEventListener("click", () => {
    navList.classList.toggle("active");
    burgerIcon.style.display = "none"
    closeIcon.style.display = "block"
  });
  //* 𝗮𝗱𝗱 𝗰𝗹𝗶𝗰𝗸 𝗲𝘃𝗲𝗻𝘁 𝗰𝗹𝗼𝘀𝗲 𝗶𝗰𝗼𝗻 -  𝗳𝗼𝗿 𝗰𝗹𝗼𝘀𝗶𝗻𝗴 𝘁𝗵𝗲 𝗺𝗲𝗻𝘂
  closeIcon.addEventListener("click", () => {
    navList.classList.remove("active");
    burgerIcon.style.display = "block"
    closeIcon.style.display = "none"
  });
});


// //*--------------- რეგისტრაცის გვერიდის ინპუტების ვალიდაცია
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('#registrationForm');
//   const fullNameInput = document.querySelector('#fullName');
//   const emailInput = document.querySelector('#email');
//   const fullNameError = document.querySelector('#fullNameError');
//   const emailError = document.querySelector('#emailError');
//   const passwordError = document.querySelector('#passwordError');


//   form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     // ცარიელი ინპუტების არ მიღება
//     const fullName = fullNameInput.value.trim();
//     const email = emailInput.value.trim();

//     // Validate Full Name (შეამოწმებს სახელი არის თუ არა (!fullName) ან გამოიტანს შესაბამის ერორ მესიჯს)
//     if (!fullName) {
//       showError(fullNameError, 'Full Name is required');
//     } else {
//       hideError(fullNameError);
//     }

//     // Validate Email Format (შეამოწმებს ემაილ ინპუტს აი დაიბეჭდოს ცარიელი ან არასწორი ფორმაატის მქონე ემაილი)
//     const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//     if (!email) {
//       showError(emailError, 'Email is required');
//     } else if (!emailPattern.test(email)) {
//       showError(emailError, 'Invalid email format');
//     } else {
//       hideError(emailError);
//     }

//     const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[._/])[A-Za-z\d._/]{7,}$/;
//     if (!password) {
//       showError(passwordError, 'Password is required');
//     } else if (password.length < 7) {
//       showError(passwordError, 'Password should be at least 7 characters');
//     } else if (!passwordPattern.test(password)) {
//       showError(passwordError, 'Password requires uppercase, lowercase, numbers, and characters.');
//     } else {
//       hideError(passwordError);
//     }

//   });



//   // Function to display error message
//   function showError(element, message) {
//     element.textContent = message;
//     element.style.display = 'block';
//   }

//   // Function to hide error message
//   function hideError(element) {
//     element.textContent = '';
//     element.style.display = 'none';
//   }
// });

//*--------------- რეგისტრაცის გვერიდის ინპუტების ვალიდაცია
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#registrationForm');
  const fullNameInput = document.querySelector('#fullName');
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const fullNameError = document.querySelector('#fullNameError');
  const emailError = document.querySelector('#emailError');
  const passwordError = document.querySelector('#passwordError');


  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // ცარიელი ინპუტების არ მიღება
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

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
    const pasNumber = /[0-9]/.test(password);
    const pasSymbol = /[._*@^,&-]/.test(password);

    //* თუ რომელიმე პირობა იქნება true ამ შემთხევაში არ გამოიტანს კონკრეტულად იმ ერორს რომელიც ჭეშმარიტია და დაბეჭდავს მხოლოდ falseს
    if (!password) {
      showError(passwordError, 'Password is required');
    } else if (pasUpperCase && pasLowerCase && pasNumber && pasSymbol) {
      hideError(passwordError);
    } else {
      let errorMessage = 'Password must include:';
      if (!pasUpperCase) errorMessage += 'at least 1 uppercase letter,';
      if (!pasLowerCase) errorMessage += '1 lowercase letter,';
      if (!pasNumber) errorMessage += '1 number,';
      if (!pasSymbol) errorMessage += '1 symbol (._*@-),';

      // hide/display error messages if the condition is true or false
      errorMessage = errorMessage.slice(0, -1);
      showError(passwordError, errorMessage);
    }

  });

  // Function to display error message
  function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
  }

  // Function to hide error message
  function hideError(element) {
    element.textContent = '';
    element.style.display = 'none';
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
