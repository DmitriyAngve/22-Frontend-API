const btn = document.querySelector(".btn");
const inpEle = document.querySelector("input");
const output = document.querySelector(".output");
const baseurl = "https://reqres.in/api/";

const app = { pg: 1 };
// https://reqres.in/api/users?page=2

btn.addEventListener("click", loadData);

window.addEventListener("DOMContentLoaded", loadData);

function loadData() {
  const para = "users?page=" + app.pg;
  const url = baseurl + para;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      buildPage(data);
    });
}

function buildPage(data) {
  //   console.log(data);
  output.innerHTML = "";
  data.data.forEach((user) => {
    // console.log(user);
    const main = addUser(user);
    main.addEventListener("click", (e) => {
      userPage(user.id);
    });
  });
  const div3 = makeNode(output, "div", "");
  div3.classList.add("box");
  for (let i = 0; i < data.total_pages; i++) {
    const span = makeNode(div3, "span", i + 1);
    span.classList.add("ind");
    span.addEventListener("click", (e) => {
      app.pg = i + 1;
      loadData();
    });
  }
}

function makeNode(parent, nodeType, content) {
  const el = document.createElement(nodeType);

  el.innerHTML = content;
  return parent.appendChild(el);
}

function addUser(user) {
  const output1 = makeNode(output, "div", "");
  output1.classList.add("box");
  output1.addEventListener("click", (e) => {
    userPage(user.id);
  });
  const html1 = `${user.first_name} ${user.last_name}`;
  const div1 = makeNode(output1, "div", html1);
  div1.userID = user.id;
  const html2 = `${user.email}`;
  const div2 = makeNode(output1, "div", html2);
  //   const html3 = `${user.id}`;
  //   const div3 = makeNode(output1, "div", html3);
  const img1 = makeNode(output1, "img", "");
  img1.setAttribute("src", user.avatar);
  //   console.log(img1);
  return output1;
}

function userPage(id) {
  //   console.log(id);
  const para = "users/" + id;
  const url = baseurl + para;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      createPage(data.data);
    });
}

function createPage(data) {
  //   console.log(data);
  output.innerHTML = "";
  const main = addUser(data);
  //   main.contentEditable = "true";
  main.setAttribute("contenteditable", true);
  const updateBtn = makeNode(main, "button", "update");
  updateBtn.classList.add("updateBtn");
  updateBtn.addEventListener("click", (e) => {
    const divEles = main.querySelectorAll("div");
    const userInfo = {
      name: divEles[0].textContent,
      id: divEles[0].userID,
      email: divEles[1].textContent,
    };
    console.log(userInfo);
  });
}
