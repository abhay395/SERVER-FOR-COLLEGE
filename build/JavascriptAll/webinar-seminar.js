const tableContainer = document.getElementById("tableContainer");
let certificate = [
  {
    courses: [
      {
        name: "Data Science Certification",
        description:
          "Learn to analyze and visualize data using Python and machine learning techniques.",
        duration: "3 Months",
        skills: "Data Analysis, Machine Learning, Python",
        mode: 'Offline'
      },
      {
        name: "Cybersecurity Certification",
        description:
          "Learn to analyze and visualize data using Python and machine learning techniques.",
        duration: "3 Months",
        skills: "Data Analysis, Machine Learning, Python",
        mode: 'Offline'
      },
      {
        name: "Web Development Certification",
        description:
          "Learn to analyze and visualize data using Python and machine learning techniques.",
        duration: "3 Months",
        skills: "Data Analysis, Machine Learning, Python",
        mode: 'Offline'
      },
      {
        name: "Artificial Intelligence (AI) Certification",
        description:
          "Learn to analyze and visualize data using Python and machine learning techniques.",
        duration: "3 Months",
        skills: "Data Analysis, Machine Learning, Python",
        mode: 'Offline'
      },
      {
        name: "Software Engineering Certification",
        description:
          "Learn to analyze and visualize data using Python and machine learning techniques.",
        duration: "3 Months",
        skills: "Data Analysis, Machine Learning, Python",
        mode: 'Offline',
      },
      {
        name: "Mobile App Development Certification",
        description:
          "Learn to analyze and visualize data using Python and machine learning techniques.",
        duration: "3 Months",
        skills: "Data Analysis, Machine Learning, Python",
        mode: 'Offline'
      },
      {
        name: "Cloud Computing Certification",
        description:
          "Learn to analyze and visualize data using Python and machine learning techniques.",
        duration: "3 Months",
        skills: "Data Analysis, Machine Learning, Python",
        mode: 'Offline'
      },
    ],
  },
];

// function loader hide
function loader() {
  document.getElementById("loader").remove();
}

// Create a table element
let tableElement = document.createElement("table");
tableElement.className = "table table-hover table-bordered mt-5";

// Build the table structure dynamically
if (certificate.length === 0) {
  let div = document.createElement("div");
  div.className = "m-3";
  tableContainer.appendChild(div);
  let note = `<div class="col-12 text-center">
             <p class=" text-danger">No Time Table data available at the moment.</p>
           </div>`;
  div.innerHTML = note;
} else {
  certificate.forEach((item) => {
    // Create the table header
    let table = `
          <thead>
            <tr class="bg-light">
              <th scope="col" style="width: 10%;">S No.</th>
              <th scope="col">Certification Name</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Mode</th>
              <th scope="col">Skills Gained</th>
            </tr>
          </thead>
          <tbody>
            ${item.courses
              .map(
                (course, index) => `
              <tr>
                <th scope="row">${index + 1}</th>
                <td>${course.name}</td>
                <td>${course.description}</td>
                <td>${course.duration}</td>
                <td>${course.mode}</td>
                <td>${course.skills}</td>
              </tr>`
              )
              .join("")}
          </tbody>`;

    // Append the generated table structure to the table element
    tableElement.innerHTML += table;
  });
}

// Append the table element to the container
tableContainer.appendChild(tableElement);

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
