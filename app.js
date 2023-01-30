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
  console.log(data);
  output.innerHTML = "";
  data.data.forEach((user) => {
    console.log(user);
    const html1 = `${user.first_name} ${user.last_name} ${user.id}`;
    const div1 = makeNode(output, "div", html1);
    const html2 = `${user.email}`;
    const div2 = makeNode(output, "div", html2);
    const img1 = makeNode(output, "img", "");
    img1.setAttribute("src", user.avatar);
    console.log(img1);
  });
  const div3 = makeNode(output, "div", "");
  for (let i = 0; i < data.total_pages; i++) {
    const span = makeNode(div3, "span", i + 1);
    span.classList.add("ind");
  }
}

function makeNode(parent, nodeType, content) {
  const el = document.createElement(nodeType);

  el.innerHTML = content;
  return parent.appendChild(el);
}
