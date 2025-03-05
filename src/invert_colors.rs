use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn invert_colors(data: &mut [u8], has_alpha: bool) {
    let step = if has_alpha { 4 } else { 3 };
    for i in (0..data.len()).step_by(step) {
        data[i] = 255 - data[i];       // Red
        data[i + 1] = 255 - data[i + 1]; // Green
        data[i + 2] = 255 - data[i + 2]; // Blue
    }
}
