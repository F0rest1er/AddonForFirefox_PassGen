document.addEventListener("DOMContentLoaded", function () {
  // Локализация текста
  document.title = chrome.i18n.getMessage("popupTitle");
  document.getElementById("popupTitle").textContent =
    chrome.i18n.getMessage("popupTitle");
  document.getElementById("passwordLengthLabel").textContent =
    chrome.i18n.getMessage("passwordLength") + ":";
  document.getElementById("uppercaseLabel").textContent =
    chrome.i18n.getMessage("uppercaseLetters");
  document.getElementById("lowercaseLabel").textContent =
    chrome.i18n.getMessage("lowercaseLetters");
  document.getElementById("numbersLabel").textContent =
    chrome.i18n.getMessage("numbers");
  document.getElementById("symbolsLabel").textContent =
    chrome.i18n.getMessage("specialSymbols");
  document.getElementById("passwordCountLabel").textContent =
    chrome.i18n.getMessage("passwordCount") + ":";
  document.getElementById("generate").textContent =
    chrome.i18n.getMessage("generateButton");

  // Добавление обработчика событий для кнопки генерации паролей
  const generateBtn = document.getElementById("generate");
  generateBtn.addEventListener("click", generatePasswords);

  // Обработчики для кнопок увеличения и уменьшения значений
  document
    .querySelectorAll(".input-group button.decrement")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        const input = event.target.parentNode.querySelector("input");
        input.value = Math.max(parseInt(input.min), parseInt(input.value) - 1);
      });
    });

  document
    .querySelectorAll(".input-group button.increment")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        const input = event.target.parentNode.querySelector("input");
        input.value = Math.min(parseInt(input.max), parseInt(input.value) + 1);
      });
    });
});

function generatePasswords() {
  const length = document.getElementById("length").value;
  const uppercase = document.getElementById("uppercase").checked;
  const lowercase = document.getElementById("lowercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const symbols = document.getElementById("symbols").checked;
  const count = document.getElementById("count").value;

  let charset = "";
  if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) charset += "0123456789";

  const symbolCharset = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const result = document.getElementById("result");
  result.innerHTML = "";

  for (let i = 0; i < count; i++) {
    let password = "";
    for (let j = 0; j < length - 1; j++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    if (symbols) {
      const symbol = symbolCharset.charAt(
        Math.floor(Math.random() * symbolCharset.length)
      );
      const insertPosition = Math.floor(Math.random() * length);
      password =
        password.slice(0, insertPosition) +
        symbol +
        password.slice(insertPosition);
    }
    const passwordElement = document.createElement("div");
    passwordElement.className = "password";
    passwordElement.textContent = password;

    // Добавление обработчика для копирования пароля
    passwordElement.addEventListener("click", () => {
      navigator.clipboard.writeText(passwordElement.textContent);
      alert("Пароль скопирован в буфер обмена!");
    });

    result.appendChild(passwordElement);
  }
}
