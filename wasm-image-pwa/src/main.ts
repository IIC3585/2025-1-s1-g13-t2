import './style.css';
import init, { grayscale_image, flip_image } from '../rust/pkg'

let wasmReady = false;
let originalBytes: Uint8Array | null = null;

const upload = document.getElementById('upload') as HTMLInputElement;
const preview = document.getElementById('preview') as HTMLImageElement;
const grayscaleBtn = document.getElementById('grayscale') as HTMLButtonElement;
const flipBtn = document.getElementById('flip') as HTMLButtonElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;

async function setup() {
  if (!wasmReady) {
    await init();
    wasmReady = true;
  }
}

setup();

upload.addEventListener('change', async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const buffer = await file.arrayBuffer();
  originalBytes = new Uint8Array(buffer);

  preview.src = URL.createObjectURL(file);
});

grayscaleBtn.addEventListener('click', () => {
  if (!originalBytes) return;
  const result = grayscale_image(originalBytes);
  showResult(result);
});

flipBtn.addEventListener('click', () => {
  if (!originalBytes) return;
  const result = flip_image(originalBytes);
  showResult(result);
});

function showResult(bytes: Uint8Array) {
  const blob = new Blob([bytes], { type: 'image/png' });
  const url = URL.createObjectURL(blob);
  const img = document.createElement('img');
  img.src = url;
  resultDiv.innerHTML = '';
  resultDiv.appendChild(img);
}
