// inschrijven leden supportersclub  /////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("lsc-contact-form");
  const successModal = document.getElementById("success-message");
  const okButton = document.getElementById("ok-button");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbw--AErz1vjf3Wv0Xt-i2KUxsG7s352cMyme2pHGfHOatvGS8Jhi3RZ2Ql72MIaZm8V/exec"; // <-- BELANGRIJK: hier komt je URL

    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => (object[key] = value));

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(object),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        // Toon de pop-up
        successModal.style.display = "block";
        form.reset();
      } else {
        alert(
          "Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw."
        );
      }
    } catch (error) {
      console.error("Fout bij het verzenden van het formulier:", error);
      alert(
        "Er is een fout opgetreden. Controleer je internetverbinding en probeer het opnieuw."
      );
    }
  });

  okButton.addEventListener("click", () => {
    // Verberg de pop-up
    successModal.style.display = "none";
    // Navigeer terug naar de hoofdpagina
    window.location.href = "index.html";
  });
});
