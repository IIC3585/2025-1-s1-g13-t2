use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn check_state(name: &str) -> String {
    format!("Check: {}", name)
}
