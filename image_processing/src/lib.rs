use wasm_bindgen::prelude::*;
use std::io::Cursor;
use image::ImageReader;
use image::ImageFormat;

#[wasm_bindgen]
pub fn check_state(name: &str) -> String {
    format!("Check: {}", name)
}

#[wasm_bindgen]
pub fn glitch_image(image_bytes: &[u8]) -> Result<Vec<u8>, JsValue> {
    
    let img = ImageReader::new(Cursor::new(image_bytes))
        .with_guessed_format()
        .map_err(|e| JsValue::from_str(&e.to_string()))? // rust error to js error
        .decode()
        .map_err(|e| JsValue::from_str(&e.to_string()))?; // rust error to js error

    let processed_image = img.grayscale();

    let mut buffer = Vec::new();
    processed_image
        .write_to(&mut Cursor::new(&mut buffer), ImageFormat::Png)
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    Ok(buffer)
}

#[wasm_bindgen]
pub fn test_wasm() -> String {
    "Hello from Rust!".to_string()
}