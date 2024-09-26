const rsContainer = document.getElementById("rs-container");

const researchData = {
  onres: {
    type: "Ongoing Research",
    items: [
      {
        title: "Artificial Intelligence",
        img: "https://res.cloudinary.com/dhcszkydc/image/upload/v1727325082/aiimage_xizisv.jpg",
        desc: "Research on machine learning algorithms and neural networks.",
      },
      {
        title: "Cybersecurity",
        img: "https://res.cloudinary.com/dhcszkydc/image/upload/v1727325083/cybercs_omvolo.jpg",
        desc: "Studying network security protocols and threat detection systems.",
      },
      {
        title: "Data Science",
        img: "https://res.cloudinary.com/dhcszkydc/image/upload/v1727325079/datascience_j2c7j4.jpg",
        desc: "Analyzing big data to uncover insights and trends.",
      },
    ],
  },
  publication: {
    type: "Publications",
    items: [
      {
        title: "Title of Research Paper 1",
        desc: "Brief description of the research paper.",
        link: "/index.html",
      },
      {
        title: "Title of Research Paper 2",
        desc: "Brief description of the research paper.",
        link: "/index.html",
      },
      {
        title: "Title of Research Paper 3",
        desc: "Brief description of the research paper.",
        link: "/index.html",
      },
    ],
  },
  rsgroup: {
    type: "Research Groups",
    items: [
      {
        title: "Artificial Intelligence",
        desc: "Research on machine learning algorithms and neural networks.",
      },
      {
        title: "Cybersecurity",
        desc: "Studying network security protocols and threat detection systems.",
      },
      {
        title: "Data Science",
        desc: "Analyzing big data to uncover insights and trends.",
      },
    ],
  },
};

// access object
const ongoing = researchData.onres;
const publication = researchData.publication;
const rsgroup = researchData.rsgroup;

// Function to generate cards
const generateCards = (type, items, isImageRequired = false) => {
  return `
    <h2 class="text-center mt-5">${type}</h2>
    <div class="row mt-4">
      ${items
        .map(item => `
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                ${isImageRequired ? `<img src="${item.img}" height="200px" style="object-fit: cover" class="card-img-top" alt="${item.title} Research" />` : ''}
                <h5 class="research-card-title">${item.title}</h5>
                <p class="card-text">
                  ${item.desc} 
                  ${item.link ? `<a href="${item.link}" class="btn btn-primary">Read More</a>` : ''}
                </p>
              </div>
            </div>
          </div>
        `).join('')}
    </div>
  `;
};

// Clear the container before appending new content
rsContainer.innerHTML = `
  ${generateCards(ongoing.type, researchData.onres.items, true)}
  ${generateCards(publication.type, researchData.publication.items)}
  ${generateCards(rsgroup.type, researchData.rsgroup.items)}
`;
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
