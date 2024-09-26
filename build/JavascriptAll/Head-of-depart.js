const headcontainer = document.getElementById("head-depart");
let headobj = [
  {
    id: 1,
    name: "Dr. RK Dixit",
    img: "https://res.cloudinary.com/dhcszkydc/image/upload/v1727324991/dr-r-k-dixit_aavsrs.jpg",
    post: "Head of Computer Science Department",
    desc: " Dr. RK Dixit has over 20 years of experience in teaching and research. His areas of expertise include Artificial Intelligence, Data Science, and Cybersecurity. He has published over 50 research papers in various international journals and conferences.",
    email: "ankushpatidar339@gmal.com",
    phone: 9876543210,
  },
];

headobj.forEach((item)=>{
    headcontainer.innerHTML=`<div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="card shadow-lg border-0">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src=${item.img}
                  class="img-fluid rounded-start h-100 object-fit-cover"
                  alt="Head of Department"
                />
              </div>
              <div class="col-md-8 align-items-center">
                <div class="card-body p-4">
                  <h5 class="card-title">${item.name}</h5>
                  <span class="badge bg-primary mb-2">${item.post}</span>
                  <p class="card-text">
                  ${item.desc}
                  </p>
                  <ul class="list-unstyled">
                    <li>
                      <i class="fas fa-envelope"></i> 
                      <span class="fw-bold">Email:</span> 
                      ${item.email}
                    </li>
                    <li>
                      <i class="fas fa-phone"></i> 
                      <span class="fw-bold">Phone:</span> 
                      +91-${item.phone}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
})



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
