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
  const signUpListItem = createListItem("Sign Up", "registracion.html");
  const loginListItem = createListItem("Login", "registracion.html");

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



//* ფუნქცია API-დან მომხმარებლის მონაცემების წამოსაღებად
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

//* აიპიდან ამინდის მონაცემების წამოღება

const apiKey = "1749be3ec01c4e79d74d629cfc9ddfbb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const selectableCities = [
  { name: "Batumi", value: "batumi" },
  { name: "Tbilisi", value: "Tbilisi" },
  { name: "Kutaisi", value: "Kutaisi" },
  { name: "Paris", value: "paris" },
  { name: "Rome", value: "rome" },
  { name: "Barcelona", value: "barcelona" },
  { name: "Amsterdam", value: "amsterdam" },
  { name: "Prague", value: "prague" },
  { name: "Tokyo", value: "tokyo" },
  { name: "Sydney", value: "sydney" },
  { name: "Mexico ", value: "Mexico " },
  { name: "Cairo", value: "cairo" }
];

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon img");
const errorCityName = document.querySelector(".errorCityName");


function populateCitySelect() {
  const citySelect = document.getElementById("citySelect");
  selectableCities.forEach(city => {
    const option = document.createElement("option");
    option.value = city.value;
    option.textContent = city.name;
    citySelect.appendChild(option);
  });
}

populateCitySelect();

async function checkWeather(city) {
  if (!city) {
    console.error("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if (!response.ok) {
      console.error(`City not found (${response.status} - ${response.statusText})`);
      errorCityName.style.display = "block";
      return;
    }

    const data = await response.json();
    const cityElement = document.querySelector(".city");
    const tempElement = document.querySelector(".temp");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");

    cityElement.innerHTML = data.name;
    tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
    humidityElement.innerHTML = `${data.main.humidity}%`;
    windElement.innerHTML = `${data.wind.speed}km/h`;

    const weatherMain = data.weather[0].main;

    const weatherIcons = {
      Clouds: "../image/Clouds.png",
      Clear: "../image/Clouds.png",
      Rain: "../image/Rain.png",
      Drizzle: "../image/Drizzle.png",
      Misty: "../image/Mist.png",
    };

    weatherIcon.src = weatherIcons[weatherMain] || ""; 

    errorCityName.style.display = "none";
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

const citySelect = document.getElementById("citySelect");

citySelect.addEventListener("change", () => {
  const selectedCity = citySelect.value; 
  checkWeather(selectedCity);
});


searchBtn.addEventListener("click", () => {
  const cityName = searchBox.value.trim();
  checkWeather(cityName);
});


checkWeather("batumi");