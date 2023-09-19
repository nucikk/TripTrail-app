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
    const inputValue = event.target.value.trim();

    if (!inputValue || !/^\d+$/.test(inputValue)) {
      ing
      event.target.value = '';
    } else if (inputValue.length === 1) {
      event.target.value = '995 ' + inputValue;
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


//* ფუნქცია : აიქონზე დაჭერისას შემდეგ სექციაზე უნდა გადავიდეს ნელი ანიმაციით
function scrollToSection(sectionOffset, duration = 1000) {
  const startY = window.pageYOffset; //ვერტიკალური სქროლი
  const scrollDistance = sectionOffset - startY;  //მაძილის გამოთვლა
  let startTime;

  //^ანიმაცის სტილი
  const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  //* სქროლის პოზიცის გამოთვლის ფუნქცია
  function animation(currentTime) {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    const elapsedTime = currentTime - startTime;
    const scrollPosition = easeInOut(elapsedTime / duration) * scrollDistance + startY;

    window.scrollTo(0, scrollPosition);

    if (elapsedTime < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.getElementById("scrollToNext").addEventListener("click", () => {

  const nextSection = document.getElementById("nextSection");
  const destination = nextSection.offsetTop;

  scrollToSection(destination);
});


//* აიქონის დამატება 1300pz რეზოლუციაზე 
let arrowContainerAdded = false;

function addArrowContainer() {
  const bannerContent = document.querySelector(".banner_content");

  const arrowContainer = document.createElement("div");
  arrowContainer.className = "arrow_container";

  const arrowImage = document.createElement("img");
  arrowImage.className = "arrow topArrow";
  arrowImage.src = "../image/down-arrow.png";
  arrowImage.alt = "draw icon";
  arrowImage.id = "scrollToNext";

  arrowContainer.appendChild(arrowImage);
  bannerContent.appendChild(arrowContainer);

  arrowImage.addEventListener("click", () => {
    const nextSection = document.getElementById("nextSection");
    const destination = nextSection.offsetTop;

    scrollToSection(destination);
  });

  arrowContainerAdded = true;
}

function checkScreenWidth() {
  if (window.innerWidth <= 1300 && !arrowContainerAdded) {
    addArrowContainer();
  } else if (window.innerWidth > 1300 && arrowContainerAdded) {
    // წაიშალოს აიქონი 1300pxზე ზემოთ
    const arrowContainer = document.querySelector(".arrow_container");
    if (arrowContainer) {
      arrowContainer.parentNode.removeChild(arrowContainer);
    }
    arrowContainerAdded = false;
  }
}

window.addEventListener("resize", checkScreenWidth);
checkScreenWidth();


//* ფუნქცია uparrow აიქონისთვის რომ გამოჩნდეს მეორე სეექციიდან
function toggleUpArrowVisibility() {
  const upArrow = document.querySelector(".uparrow");
  if (window.scrollY > 0) {
    upArrow.style.display = "block";
  } else {
    upArrow.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


toggleUpArrowVisibility();

window.addEventListener("scroll", toggleUpArrowVisibility);
const upArrow = document.querySelector(".uparrow");
upArrow.addEventListener("click", scrollToTop);

//* ფუნქცია სქროლის ანიმაციისთვის
function scrollToTop() {
  const scrollDuration = 1000;
  const scrollStep = -window.scrollY / (scrollDuration / 15);

  function scroll() {
    if (window.scrollY > 0) {
      window.scrollBy(0, scrollStep);
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}



// //* /* ფუნქცია API-დან მომხმარებლის მონაცემების წამოსაღებად
async function fetchUserData() {
  try {
    const response = await fetch('https://reqres.in/api/users?page=1');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const users = data.data;

    return users;
  } catch (error) {
    throw new Error('Error fetching user data:', error);
  }
}



function createUserReview(user, comment, backgroundColor) {
  const userReview = document.createElement('div');
  userReview.className = 'card_views';
  userReview.style.backgroundColor = backgroundColor;

  userReview.innerHTML = `
    <div class="userInfo">
      <img class="userImg" src="${user.avatar}" alt="User Image" />
      <h4 class="userName FtMono">${user.first_name} ${user.last_name}</h4>
      <div class="userMail">
        <p>${user.email}</p>
      </div>
    </div>
    <div class="comment">
      <p class="commentary">${comment}</p>
    </div>
    <div class="stars">
      <img src="../image/Stars.svg" alt="Stars" />
    </div>
  `;

  return userReview;
}
//* ფუნქცია API-დან მომხმარებლის მონაცემების წამოსაღებად
async function fetchUserData() {
  try {
    const response = await fetch('https://reqres.in/api/users?page=1');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching user data: ' + error.message);
  }
}

//* ფუნქცია შეფასბის სექციაში ინფორმაცის დასამატებლად
async function addUserReviewsToContainer() {
  try {
    const users = await fetchUserData();
    const userReviewsContainer = document.getElementById('user-reviews');
    const colors = ['#121E28', '#233748c3', '#1a1324b7', '#16241a89'];

    // Array of comments
    const comments = [
      "love the user-friendly interface of this site. It's so easy to compare prices and options. I've saved a ton of money by booking through them.",
      "The travel packages offered here are incredible.",
      "I booked an all-inclusive deal, and it was worth every penny. Everything was well-organized, and I had a blast!",
      "The site helped me discover hidden gems in every city I visited. I wouldn't have known about these places without their travel guides. Truly a gem of a site!",
      "I always recommend this site to my friends and family. It's my go-to for all my travel needs. Thanks for making my vacations stress-free and enjoyable.",
      "The loyalty rewards program is a game-changer. I've earned so many points and discounts by booking through this site. It's like getting rewarded for having fun!",
      "I had an issue with a hotel reservation, and the support team resolved it within minutes. That level of service is what keeps me coming back."
    ];
    users.forEach((user, index) => {
      const backgroundColor = colors[index % colors.length];
      const comment = comments[index % comments.length];
      const userReview = createUserReview(user, comment, backgroundColor);
      userReviewsContainer.appendChild(userReview);
    });


    let currentIndex = 0;
    const sliderContainer = document.querySelector('.slider');
    const sliderReviews = document.querySelectorAll('.card_views');
    const totalReviews = sliderReviews.length;
    const visibleReviews = 2;

    function showReviews(startIndex) {
      sliderReviews.forEach((review, i) => {
        review.style.display = i >= startIndex && i < startIndex + visibleReviews ? 'block' : 'none';
      });
    }

    //* ყველა ელმენტი გამოჩნდეს 1300 რეზოლუციაზე მაღლა
    function handleViewportChange() {
      if (window.innerWidth >= 1300) {
        sliderReviews.forEach((review) => {
          review.style.display = 'block';
        });
      } else {
        showReviews(currentIndex);
      }
    }

    handleViewportChange();
    window.addEventListener('resize', handleViewportChange);

    // next button 
    document.querySelector('.slideIcon.next').addEventListener('click', () => {
      currentIndex += visibleReviews;
      if (currentIndex >= totalReviews) {
        currentIndex = 0;
      }
      showReviews(currentIndex);
    });

    //back button 
    document.querySelector('.slideIcon.back').addEventListener('click', () => {
      currentIndex -= visibleReviews;
      if (currentIndex < 0) {
        currentIndex = 0;
      }
      showReviews(currentIndex);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

addUserReviewsToContainer();
