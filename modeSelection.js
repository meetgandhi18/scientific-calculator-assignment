const selector = document.getElementById("modeSelector");
const trigSection = document.getElementById("trigSection");
const functionSection = document.getElementById("functionSection");

selector.addEventListener("change", function () {
  trigSection.style.display = "none";
  functionSection.style.display = "none";

  if (this.value === "trig") {
    trigSection.style.display = "flex";
  } else if (this.value === "func") {
    functionSection.style.display = "flex";
  }
});
