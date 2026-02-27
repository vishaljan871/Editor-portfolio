const menu = document.querySelector(".menu-box")
const menuI1 = document.querySelector(".menu-i1")
const menuI2 = document.querySelector(".menu-i2")
const menuI3 = document.querySelector(".menu-i3")
const sidebar = document.querySelector(".sidebar")

menu.addEventListener('click',() => {
  sidebar.classList.toggle("open")
  menuI1.classList.toggle("opn")
  menuI2.classList.toggle("opn")
  menuI3.classList.toggle("opn")
})


