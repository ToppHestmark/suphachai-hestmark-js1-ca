const form = document.querySelector("#contactForm");
const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");



function validateForm() {
  event.preventDefault();


  subject.value.trim().length >= 10 
  ? subjectError.style.display = "none"
  : subjectError.style.display = "block"

  console.log(subject.value.trim().length)
}

form.addEventListener("submit", validateForm)