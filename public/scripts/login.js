import { showTooltip } from "./dom-creators.js";

const form = document.querySelector(".auth-form");
form &&
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (!response.ok) {
        throw new Error("Ошибка аутентификации");
      }
      const result = await response.json();
      document.cookie = `jwt=${result.jwt}`;
      window.location.href = "/admin/dashboard";
    } catch (error) {
      if (error instanceof TypeError) {
        showTooltip("Ошибка сети. Пожалуйста, проверьте ваше подключение к интернету.");
      } else {
        showTooltip(error.message);
      }
    }
  });

const logoutButton = document.querySelector(".logout-button");
logoutButton &&
  logoutButton.addEventListener("click", async () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  });
