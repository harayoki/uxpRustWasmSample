use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn invert_colors(data: &mut [u8]) {
    for i in (0..data.len()).step_by(4) {
        data[i] = 255 - data[i];       // Red
        data[i + 1] = 255 - data[i + 1]; // Green
        data[i + 2] = 255 - data[i + 2]; // Blue
    }
}
