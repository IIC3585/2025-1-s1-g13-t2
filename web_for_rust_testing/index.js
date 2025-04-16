import init, { check_state } from "./pkg/image_processing.js";

async function run() {
  await init();
  const message = check_state("This is a test");
  document.getElementById("output").textContent = message;
}

run();
