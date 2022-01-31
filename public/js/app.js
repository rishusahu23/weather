const myForm = document.querySelector(".myForm");
const input = document.querySelector("input");
const temp = document.querySelector(".temp");

const onSubmit = (event) => {
  event.preventDefault();
  const value = input.value;
  console.log(value);
  fetch(`/weather?address=${value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      temp.textContent = data.temperature;
    })
    .catch((error) => {
      temp.textContent = error;
    });
};

myForm.addEventListener("submit", onSubmit);
