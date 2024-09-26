// const newsevent = document.getElementById("news-event");
// const newssection = [
//   {
//     type: "NEWS",
//     items: [
//       {
//         title:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.",
//       },
//       {
//         title:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.",
//       },
//       {
//         title:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.",
//       },
//     ],
//   },
//   {
//     type: "EVENT",
//     items: [
//       {
//         title:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.",
//       },
//       {
//         title:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.",
//       },
//       {
//         title:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.",
//       },
//     ],
//   },
//   {
//     type: "REQURITMENT",
//     items: [
//       {
//         title:
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.",
//       },
//     ],
//   },
// ];

// newssection.forEach((item) => {
//   let eventcard = `<div class="col-md-4">
//         <h5 class="bg-primary text-white text-center p-2">${item.type}</h5>
//         <div class="news-box p-2">
//             ${item.items.map((data) => `<p class='border p-2'>${data.title}</p>`).join("")}
//         </div>
//       </div>`;
//   newsevent.innerHTML += eventcard;
// });

// document.addEventListener("DOMContentLoaded", async () => {
//   const navbarUl = document.querySelector("#navbarNav ul");
//   const login = document.querySelector("#login");
//   const adminPanelItem = createNavItem("Admin Panel", "/Pages/AdminPanel.html");
//   const loginItem = createNavItem("Login", "/Pages/Login.html");

//   try {
//     const response = await fetch("/check/myUser");
//     const data = await response.json();
//     navbarUl.appendChild(adminPanelItem);

//     console.log(data);
//   } catch (error) {
//     navbarUl.appendChild(loginItem);
//     console.error("Authentication check failed:", error);
//   }
// });

// // Helper function to create nav item
// function createNavItem(text, href) {
//   const li = document.createElement("li");
//   li.className = "nav-item";

//   const a = document.createElement("a");
//   a.className = "nav-link";
//   a.href = href;
//   a.textContent = text;

//   li.appendChild(a);
//   return li;
// }
