// import init, { flip_image } from "./pkg/image_processing.js";
import init, { grayscale_image, flip_image } from "./pkg/image_processing.js";


let wasmReady = false;
let originalBytes = null
const upload = document.getElementById("upload");
const preview = document.getElementById("preview");

const setup = async () => {
  if (!wasmReady) {
    await init();
    wasmReady = true;
  }
};

setup();

upload.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const buffer = await file.arrayBuffer();
  originalBytes = new Uint8Array(buffer);

  const url = URL.createObjectURL(file);
  preview.src = url;
  
});

grayscale.addEventListener("click", async () => {
  const processedImage = grayscale_image(originalBytes);
  showResult(processedImage);
});

flip.addEventListener("click", async () => {
  const processedImage = flip_image(originalBytes);
  showResult(processedImage);
});

function showResult(bytes) {
  const blob = new Blob([bytes], { type: "image/png" });
  const url = URL.createObjectURL(blob);

  const img = document.createElement("img");
  img.src = url;
  img.alt = "Processed image"; 

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  resultDiv.appendChild(img);
}