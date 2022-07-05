export type Fractal = typeof import("./fractal/index.js");

export function load() {
    return import("./fractal/index.js");
}
