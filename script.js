const sliderImages = document.querySelectorAll(".background-slider img");
const season = document.getElementById("season");
const title = document.getElementById("title");
let currentImage = 0;

function startSlider() {
  setInterval(() => {
    sliderImages[currentImage].style.opacity = "0";
    title.style.transition = "left 0.5s ease-in-out";
    season.style.transition = "left 0.5s ease-in-out";

    currentImage = (currentImage + 1) % sliderImages.length;

    title.style.left = `${-currentImage * 100}%`;
    season.style.left = `${-currentImage * 100}%`;

    sliderImages[currentImage].style.opacity = "1";
  }, 4000); // Change the duration (in milliseconds) between slides as needed
}

window.addEventListener("load", startSlider);
