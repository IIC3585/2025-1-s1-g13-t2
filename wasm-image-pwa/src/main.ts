import './style.css'

import init, { grayscale_image, flip_image } from "./wasm/pkg/image_processing";

let wasmReady = false;
let originalBytes: Uint8Array | null = null;

const upload = document.getElementById("upload") as HTMLInputElement;
const preview = document.getElementById("preview") as HTMLImageElement;
const grayscaleBtn = document.getElementById("grayscale") as HTMLButtonElement;
const flipBtn = document.getElementById("flip") as HTMLButtonElement;
const resultDiv = document.getElementById("result") as HTMLDivElement;

const setup = async () => {
  if (!wasmReady) {
    await init();
    wasmReady = true;
  }
};

setup();

upload.addEventListener("change", async (e) => {
  const file = upload.files?.[0];
  if (!file) return;

  const buffer = await file.arrayBuffer();
  originalBytes = new Uint8Array(buffer);

  const url = URL.createObjectURL(file);
  preview.src = url;
});

grayscaleBtn.addEventListener("click", async () => {
  if (!originalBytes) return;
  const processed = grayscale_image(originalBytes);
  showResult(processed);
});

flipBtn.addEventListener("click", async () => {
  if (!originalBytes) return;
  const processed = flip_image(originalBytes);
  showResult(processed);
});

function showResult(bytes: Uint8Array) {
  const blob = new Blob([bytes], { type: "image/png" });
  const url = URL.createObjectURL(blob);

  resultDiv.innerHTML = "";
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Processed image";
  resultDiv.appendChild(img);
}
