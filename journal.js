'use strict'
//* ფუნქცია პოსტის შესაქმნელად 

function recordPost() {
    const title = document.getElementById("title").value;
    const location = document.getElementById("location").value;
    const date = document.getElementById("date").value;
    const post = document.getElementById("post").value;
  
    if (!(title || location || date || post)) {
      alert("Please fill in at least one field.");
      return;
    }
  
    const postContainer = document.createElement("div");
    postContainer.classList.add("post");
  
    const content = `
      ${title ? `<h2>${title}</h2>` : ''}
      ${location ? `<p><strong>Location:</strong> ${location}</p>` : ''}
      ${date ? `<p><strong>Date:</strong> ${date}</p>` : ''}
      ${post ? `<p>${post}</p>` : ''}
    `;
  
    postContainer.innerHTML = content;
  
    const container = document.getElementById("postContainer");
    container.appendChild(postContainer);
  
    ["title", "location", "date", "post"].forEach(fieldId => {
      document.getElementById(fieldId).value = "";
    });
  
    container.style.display = "block";
  }
  
  