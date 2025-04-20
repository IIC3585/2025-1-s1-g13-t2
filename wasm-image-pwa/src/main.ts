// src/main.ts
import './style.css';
import init, { grayscale_image, flip_image } from '../rust/pkg';
import { saveImage, getAllImages } from './db';

let wasmReady = false;
let originalBytes: Uint8Array | null = null;

const upload = document.getElementById('upload') as HTMLInputElement;
const preview = document.getElementById('preview') as HTMLImageElement;
const grayscaleBtn = document.getElementById('grayscale') as HTMLButtonElement;
const flipBtn = document.getElementById('flip') as HTMLButtonElement;
const resultDiv = document.getElementById('result') as HTMLDivElement;
const savedImagesDiv = document.getElementById('saved-images') as HTMLDivElement;
const notifyBtn = document.getElementById('enable-notifications');

if (notifyBtn) {
  notifyBtn.addEventListener('click', async () => {
    const permiso = await Notification.requestPermission(); 
    if (permiso === 'granted') {
      alert('Notificaciones habilitadas 🎉');
    } else {
      alert('No se pudieron habilitar las notificaciones.');
    }   
  });
}


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
  img.alt = 'Processed image';


  img.src = url;  
  if (Notification.permission === 'granted') {
    new Notification('Procesado completado', {
      body: 'Tu imagen ya está lista para descargar.',
      icon: '/pwa-192x192.png'
    }); 
  }

  resultDiv.innerHTML = '';
  resultDiv.appendChild(img);

  saveImage(blob)
    .then(() => console.log('Imagen guardada'))
    .catch((err) => console.error('Error:', err));
}

async function showStoredImages() {
  const images = await getAllImages();
  savedImagesDiv.innerHTML = '';

  images.forEach((blob) => {
    const url = URL.createObjectURL(blob);
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Imagen guardada';
    img.style.maxWidth = '200px';
    img.style.margin = '10px';
    savedImagesDiv.appendChild(img);
  });
}

document.getElementById('show-saved')?.addEventListener('click', showStoredImages);
