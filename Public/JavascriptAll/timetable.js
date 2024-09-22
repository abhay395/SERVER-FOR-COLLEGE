let data = [
  {
    _id: "66f00d44a5d7b7a259cad294",
    courseName: "BCA",
    pdfLink:
      "https://res.cloudinary.com/dhcszkydc/raw/upload/v1727007900/JavaScript_Roadmap_for_1_Month_sydyhw.pdf",
    createdAt: "2024-09-22T12:27:48.427Z",
    __v: 0,
  },
  {
    _id: "66f00d63a5d7b7a259cad296",
    courseName: "Bsc cs",
    pdfLink:
      "https://res.cloudinary.com/dhcszkydc/raw/upload/v1727007900/JavaScript_Roadmap_for_1_Month_sydyhw.pdf",
    createdAt: "2024-09-22T12:28:19.587Z",
    __v: 0,
  },
  {
    _id: "66f00d69a5d7b7a259cad298",
    courseName: "Msc cs",
    pdfLink:
      "https://res.cloudinary.com/dhcszkydc/raw/upload/v1727007900/JavaScript_Roadmap_for_1_Month_sydyhw.pdf",
    createdAt: "2024-09-22T12:28:25.870Z",
    __v: 0,
  },
];

let tbody = document.querySelector("tbody");
data.forEach((item,index) => {
  let tr = document.createElement("tr");
  tr.innerHTML =`
            <th scope="row">${index}</th>
            <td>${item.courseName}</td>
            <td><a href="${item.pdfLink}">View</td>
            <td><a href="${item.pdfLink}">View</td>
          `;
  tbody.append(tr);
});
