const facultyData = document.getElementById("facultydata");

// Function to hide the loader
function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) loader.remove();
}

// Function to display a message when no data is available
function displayNoDataMessage() {
  facultyData.innerHTML = `
    <div class="col-12 text-center">
      <p class="text-muted">No faculty data available at the moment.</p>
    </div>`;
}

// Function to display an error message in case of a failed fetch
function displayErrorMessage() {
  facultyData.innerHTML = `
    <div class="col-12 text-center">
      <p class="text-danger">Error loading faculty data. Please try again later.</p>
    </div>`;
}

// Function to create a faculty card dynamically
function createFacultyCard(faculty) {
  const colDiv = document.createElement("div");
  colDiv.className = "col-md-4 mb-4";

  // Template literal for card HTML structure
  colDiv.innerHTML = `
    <div class="card h-100 shadow border rounded">
      <img src="${faculty.image}" class="card-img-top img-fluid" alt="Faculty Image" style="object-fit: contain;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-center mb-3">${faculty.name}</h5>
        <p class="card-text"><strong>Qualification:</strong> ${faculty.qualification}</p>
        <p class="card-text"><strong>Contact:</strong> ${faculty.contact}</p>
      </div>
    </div>`;
  
  return colDiv;
}

// Function to render the faculty data
function renderFacultyData(facultyList) {
  if (facultyList.length === 0) {
    displayNoDataMessage();
    return;
  }

  facultyList.forEach((faculty) => {
    const facultyCard = createFacultyCard(faculty);
    facultyData.appendChild(facultyCard);
  });
}

// Fetch faculty data and handle the response
function fetchFacultyData() {
  fetch("/teacher")
    .then((response) => response.json())
    .then((data) => {
      hideLoader();
      renderFacultyData(data);
    })
    .catch((error) => {
      console.error("Error fetching faculty data:", error);
      hideLoader();
      displayErrorMessage();
    });
}

// Initialize the fetching of faculty data
fetchFacultyData();

document.addEventListener("DOMContentLoaded", async () => {
  const navbarUl = document.querySelector("#navbarNav ul");
  const login = document.querySelector("#login");
  const adminPanelItem = createNavItem("Admin Panel", "/Pages/AdminPanel.html");
  const loginItem = createNavItem("Login", "/Pages/Login.html");

  try {
    const response = await fetch("/check/myUser");
    const data = await response.json();
    navbarUl.appendChild(adminPanelItem);

    console.log(data);
  } catch (error) {
    navbarUl.appendChild(loginItem);
    console.error("Authentication check failed:", error);
  }
});

// Helper function to create nav item
function createNavItem(text, href) {
  const li = document.createElement("li");
  li.className = "nav-item";

  const a = document.createElement("a");
  a.className = "nav-link";
  a.href = href;
  a.textContent = text;

  li.appendChild(a);
  return li;
}
