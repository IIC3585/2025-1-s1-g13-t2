import init, { check_state, glitch_image, test_wasm } from "./pkg/image_processing.js";

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
  console.log(test_wasm());
  const processedImage = glitch_image(originalBytes);
  console.log(processedImage);
  showResult(processedImage);
});



function showResult(bytes) {
  const blob = new Blob([bytes], { type: "image/png" });
  const url = URL.createObjectURL(blob);

  const img = document.createElement("img");
  img.src = url;
  img.alt = "Processed image";
  img.style.maxWidth = "100%"; // Optional styling

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous result
  resultDiv.appendChild(img);
}