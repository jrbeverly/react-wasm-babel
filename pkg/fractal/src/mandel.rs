use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn mandel_iteration(x: f64, y: f64, iteration: i32) -> f64 {
    let mut r = x;
    let mut i = y;
    for a in 0..iteration {
        let tmpr = r * r - i * i + x;
        let tmpi = 2.0 * r * i + y;
        r = tmpr;
        i = tmpi;
        if r * i > 5.0 {
            return (a as f64) / (iteration as f64) * 100.0;
        }
    }

    return 0.0;
}
