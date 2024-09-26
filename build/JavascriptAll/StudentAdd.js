const form = document.querySelector('form')
const nameInput = document.querySelector('#name')
const cgpaInput = document.querySelector('#cgpa')
const courseInput = document.querySelector('#course')
const yearInput = document.querySelector('#year')
const rankInput = document.querySelector('#rank')
const examYearInput = document.querySelector('#examYear')
const imageInput = document.querySelector('#image')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = nameInput.value
    const cgpa = cgpaInput.value
    const course = courseInput.value
    const year = yearInput.value
    const rank = rankInput.value
    const examYear = examYearInput.value
    const image = imageInput.files[0]
    const formData = new FormData();
    formData.append("name", name);
    formData.append("cgpa", cgpa);
    formData.append("course", course);
    formData.append("year", year);
    formData.append("rank", rank);
    formData.append("examYear", examYear);
    formData.append("image", image);
    fetch('/student/create', {
        method: 'POST',
        body: formData
    }).then((response) => {
        nameInput.value = ''
        cgpaInput.value = ''
        courseInput.value = ''
        yearInput.value = ''
        rankInput.value = ''
        examYearInput.value = ''
        imageInput.value = ''
        alert('Student added successfully')
    }).catch((error) => {
        console.log(error)
    })

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
  