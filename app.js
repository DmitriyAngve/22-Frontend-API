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
  data.data.forEach((user) => {
    console.log(user);
  });
}
