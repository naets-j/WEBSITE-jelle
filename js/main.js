// FAQ Accordion //////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.querySelector(".faq-content");

  faqContainer.addEventListener("click", (e) => {
    const groupHeader = e.target.closest(".faq-group-header");

    if (!groupHeader) return;

    const group = groupHeader.parentElement;
    const groupBody = group.querySelector(".faq-group-body");
    const icon = groupHeader.querySelector("i");

    // Toggle icon
    icon.classList.toggle("fa-plus");
    icon.classList.toggle("fa-minus");

    // Toggle visibility of body
    groupBody.classList.toggle("open");

    // Close other open FAQ bodies
    const otherGroups = faqContainer.querySelectorAll(".faq-group");

    otherGroups.forEach((otherGroup) => {
      if (otherGroup !== group) {
        const otherGroupBody = otherGroup.querySelector(".faq-group-body");
        const otherIcon = otherGroup.querySelector(".faq-group-header i");

        otherGroupBody.classList.remove("open");
        otherIcon.classList.remove("fa-minus");
        otherIcon.classList.add("fa-plus");
      }
    });
  });
});

// Mobile Menu  /////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.querySelector(".hamburger-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburgerButton.addEventListener("click", () =>
    mobileMenu.classList.toggle("active")
  );
});

// Galerij ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DOM-elementen
const fileInputPapa = document.getElementById("file-input-papa");
const addInputPapa = document.getElementById("add-input-papa");
const galleryPapaPreview = document.getElementById("gallery-papa-preview");
const copyButtonPapa = document.getElementById("copy-button-papa");
const addPhotosContainerPapa = document.getElementById(
  "add-photos-container-papa"
);

const fileInputJelle = document.getElementById("file-input-jelle");
const addInputJelle = document.getElementById("add-input-jelle");
const galleryJellePreview = document.getElementById("gallery-jelle-preview");
const copyButtonJelle = document.getElementById("copy-button-jelle");
const addPhotosContainerJelle = document.getElementById(
  "add-photos-container-jelle"
);

// Opslag voor foto's (Base64)
let imagesPapa = [];
let imagesJelle = [];

// Functie voor de eerste upload
function handleInitialUpload(
  fileInput,
  imagesArray,
  previewContainer,
  copyButton,
  addPhotosContainer
) {
  fileInput.addEventListener("change", function (event) {
    // Maak de bestaande collage leeg
    imagesArray.length = 0;
    previewContainer.innerHTML = "";

    const files = event.target.files;
    if (files.length === 0) {
      copyButton.style.display = "none";
      addPhotosContainer.style.display = "none";
      return;
    }

    // Toon de 'voeg extra foto's toe' knop
    addPhotosContainer.style.display = "inline-block";

    let loadedCount = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagesArray.push(e.target.result);
          loadedCount++;
          if (loadedCount === files.length) {
            shuffleArray(imagesArray);
            displayImages(imagesArray, previewContainer);
            copyButton.style.display = "block";
          }
        };
        reader.readAsDataURL(file);
      }
    }
  });
}

// Functie voor het toevoegen van extra foto's
function handleAddPhotos(fileInput, imagesArray, previewContainer, copyButton) {
  fileInput.addEventListener("change", function (event) {
    const files = event.target.files;
    if (files.length === 0) return;

    let loadedCount = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagesArray.push(e.target.result);
          loadedCount++;
          if (loadedCount === files.length) {
            shuffleArray(imagesArray);
            displayImages(imagesArray, previewContainer);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  });
}

// Functie om de HTML-code te genereren en te kopiëren
function handleCopy(copyButton, imagesArray, targetPageName) {
  copyButton.addEventListener("click", function () {
    if (imagesArray.length === 0) {
      alert("Upload of laad eerst foto's.");
      return;
    }
    const collageHTML = generateGalleryHTML(imagesArray);
    navigator.clipboard
      .writeText(collageHTML)
      .then(() =>
        alert(
          `Code voor de ${targetPageName} gekopieerd! Plak deze in het betreffende bestand.`
        )
      )
      .catch((err) => console.error("Fout bij kopiëren:", err));
  });
}

// Hulpmiddelen
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayImages(images, container) {
  container.innerHTML = "";
  images.forEach((imgSrc) => {
    const item = document.createElement("div");
    item.classList.add("gallery-item");
    const img = document.createElement("img");
    img.src = imgSrc;
    item.appendChild(img);
    container.appendChild(item);
  });
}

function generateGalleryHTML(images) {
  const imageHtml = images
    .map(
      (imgSrc) => `
                <div class="gallery-item">
                    <img src="${imgSrc}" onclick="openModal(this)">
                </div>`
    )
    .join("");

  return `
            <!DOCTYPE html>
            <html lang="nl">
            <head>
                <style>
                 
                    body {
                        font-family: sans-serif;
                        margin: 0;
                        padding: fit-content;
                        background-color: var(--background-color);
                    }

                    .gallery-container {
                        column-count: 3;
                        column-gap: 15px;
                        padding: 20px;
                    }

                    .gallery-item {
                        display: inline-block;
                        width: 100%;
                        margin-bottom: 15px;
                        cursor: pointer;
                        break-inside: avoid-column;
                    }

                    .gallery-item img {
                        width: 100%;
                        height: auto;
                        display: block;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    .modal {
                        display: none; /* Standaard verborgen */
                        position: fixed;
                        z-index: 1000;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                        background-color: rgba(0, 0, 0, 0.9);
                        /* Deze properties centreren de inhoud wanneer de modal zichtbaar is */
                        justify-content: center; 
                        align-items: center;
                    }

                    .modal-content {
                        display: block;
                        max-width: 80%;
                        max-height: 80%;
                        border-radius: 8px;
                    }

                    .close {
                        position: absolute;
                        top: 20px;
                        right: 35px;
                        color: #fff;
                        font-size: 40px;
                        font-weight: bold;
                        transition: 0.3s;
                        cursor: pointer;
                    }

                    .prev, .next {
                        cursor: pointer;
                        position: absolute;
                        top: 50%;
                        width: auto;
                        padding: 16px;
                        margin-top: -50px;
                        color: white;
                        font-weight: bold;
                        font-size: 20px;
                        transition: 0.6s ease;
                        user-select: none;
                    }

                    .next { right: 0; }
                    .prev { left: 0; }
                    .prev:hover, .next:hover, .close:hover { background-color: rgba(0, 0, 0, 0.8); }

                    @media (max-width: 800px) { .gallery-container { column-count: 2; } }
                    @media (max-width: 500px) { .gallery-container { column-count: 1; } }
                </style>
            </head>
            <body>
                <div class="gallery-container" id="gallery-container">
                    ${imageHtml}
                </div>

                <div id="myModal" class="modal">
                    <span class="close" onclick="closeModal()">&times;</span>
                    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                    <a class="next" onclick="plusSlides(1)">&#10095;</a>
                    <img class="modal-content" id="modal-image">
                </div>

                <script>
                    let slideIndex = 1;
                    let imagesArray = [
                        ${images.map((imgSrc) => `'${imgSrc}'`).join(",\n")}
                    ];

                    function openModal(imgElement) {
                        slideIndex = imagesArray.indexOf(imgElement.src) + 1;
                        document.getElementById('myModal').style.display = 'flex'; /* Belangrijk voor centrering */
                        document.getElementById('modal-image').src = imgElement.src;
                    }

                    function closeModal() {
                        document.getElementById('myModal').style.display = 'none';
                    }

                    function plusSlides(n) {
                        slideIndex += n;
                        if (slideIndex > imagesArray.length) { slideIndex = 1; }
                        if (slideIndex < 1) { slideIndex = imagesArray.length; }
                        document.getElementById('modal-image').src = imagesArray[slideIndex - 1];
                    }
                    
                    document.addEventListener('keydown', function(event) {
                        if (event.key === "Escape") {
                            closeModal();
                        } else if (event.key === "ArrowLeft") {
                            plusSlides(-1);
                        } else if (event.key === "ArrowRight") {
                            plusSlides(1);
                        }
                    });
                </script>
                       <!-- Footer -->
    <footer class="footer bg-black">    
        <div class="footer-grid">
          <div>
            <a href="https://www.instagram.com/jelle_naets/" target="_blank">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
                alt="Instagram" width="30" height="30">
            </a>
          </div>
          <div>
            <ul> 
              <a href="https://www.ktt.be/" target="_blank" rel="noopener noreferrer"><h4>TEAM KTT</h4></a>           
            </ul>
          </div>
          <div>
            <ul> 
              <a href="index.html"><h4>HOME</h4></a>           
            </ul>
          </div>
          <div>
            <ul> 
              <a href="contact.html"><h4>CONTACT</h4></a>           
            </ul>
          </div>
        </div>     
    </footer>
    <script src="js/main.js"></script>
            </body>
            </html>
            `;
}

// Roep de handlers aan voor de 'Papa' galerij
handleInitialUpload(
  fileInputPapa,
  imagesPapa,
  galleryPapaPreview,
  copyButtonPapa,
  addPhotosContainerPapa
);
handleAddPhotos(addInputPapa, imagesPapa, galleryPapaPreview, copyButtonPapa);
handleCopy(copyButtonPapa, imagesPapa, "papa-galerij.html");

// Roep de handlers aan voor de 'Jelle' galerij
handleInitialUpload(
  fileInputJelle,
  imagesJelle,
  galleryJellePreview,
  copyButtonJelle,
  addPhotosContainerJelle
);
handleAddPhotos(
  addInputJelle,
  imagesJelle,
  galleryJellePreview,
  copyButtonJelle
);
handleCopy(copyButtonJelle, imagesJelle, "jelle-galerij.html");

// Agenda beheer /////////////////////////////////////////////////////////////////////////////////////////////////////////////

// tonen bezoekerspagina //

// Bewerken Editor-only pagina //

//  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
