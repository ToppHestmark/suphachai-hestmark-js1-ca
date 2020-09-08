const form = document.querySelector("#contactForm");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

form.addEventListener("submit", validateForm)

function validateForm() {
  event.preventDefault();

  subject.value.trim().length >= 10 
  ? subjectError.style.display = "none"
  : subjectError.style.display = "block"

  address.value.trim().length >= 25 
  ? addressError.style.display = "none"
  : addressError.style.display = "block"

  validateEmail(email.value)
  ? emailError.style.display = "none"
  : emailError.style.display = "block"
}

const validateEmail = email =>  /\S+@\S+\.\S+/.test(email);