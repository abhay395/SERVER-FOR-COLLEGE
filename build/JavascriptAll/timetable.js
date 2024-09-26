const tableContainer = document.getElementById("tableContainer");
let timeTable = [
    {
      session: 'Session: July 2024 - Dec. 2024 (Sem. "A")',
      courses: [
        { name: 'BCA', timeTable: 'Coming Soon', cc: 'Coming Soon' },
        { name: 'BSc', timeTable: 'Coming Soon', cc: 'Coming Soon' },
        { name: 'MSc', timeTable: 'Coming Soon', cc: 'Coming Soon' },
      ]
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
if (timeTable.length === 0) {
  let div = document.createElement("div");
  div.className = 'm-3'
  tableContainer.appendChild(div);
  let note = `<div class="col-12 text-center">
             <p class=" text-danger">No Time Table data available at the moment.</p>
           </div>`;
  div.innerHTML=note;
} else {
  timeTable.forEach((item) => {
    // Create the table header
    let table = `
          <thead>
            <tr class="bg-dark text-white">
              <td colspan="4" style="vertical-align: middle; text-align: center">
                <span style="font-size: 14pt;"><strong>${
                  item.session
                }</strong></span>
              </td>
            </tr>
            <tr class="bg-light">
              <th scope="col" style="width: 10%;">S No.</th>
              <th scope="col" style="width: 30%;">Course and Year</th>
              <th scope="col" style="width: 30%;">Time-Table</th>
              <th scope="col" style="width: 30%;">CCE</th>
            </tr>
          </thead>
          <tbody>
            ${item.courses
              .map(
                (course, index) => `
              <tr>
                <th scope="row">${index + 1}</th>
                <td>${course.name}</td>
                <td>${course.timeTable}</td>
                <td>${course.cc}</td>
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
