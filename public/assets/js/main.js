const bars = document.querySelector(".bars");
const close = document.querySelector(".close");
const header = document.querySelector(".main_header");
const navBar = document.querySelector(".navbar_menu");

bars.addEventListener("click", () => {
  navBar.classList.add("active");
  header.classList.add("active");
});

close.addEventListener("click", () => {
  navBar.classList.remove("active");
  header.classList.remove("active");
});

window.onclick = function (event) {
  if (event.target == header) {
    navBar.classList.remove("active");
    header.classList.remove("active");
  }
};