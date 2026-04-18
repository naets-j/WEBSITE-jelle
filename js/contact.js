//  Contact + bedankt ///////////////////////////////////////////////////////////////////////////////////////////

var form = document.getElementById("contactForm");
var responseContainer = document.getElementById("responseContainer");
var countdownElement = document.getElementById("countdown");
var countdown = 5;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var data = new FormData(form);
  fetch(form.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Verberg het formulier en toon het bedankbericht
        form.style.display = "none";
        responseContainer.style.display = "block";

        // Start de aftelling
        var timer = setInterval(function () {
          countdown--;
          countdownElement.textContent =
            "Je wordt over " +
            countdown +
            " seconden teruggestuurd naar de homepage.";

          if (countdown <= 0) {
            clearInterval(timer);
            // Navigeer naar de homepage
            window.location.href = "/";
          }
        }, 1000);

        return response.json();
      } else {
        return response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            throw new Error(
              data["errors"].map((error) => error["message"]).join(", ")
            );
          }
          throw new Error("Er ging iets mis. Probeer het later opnieuw.");
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Er ging iets mis. Probeer het later opnieuw.");
    });
});
