# React Webpack with Rust WebAssembly

Fiddling around with an opinionated example for Webpack builds with WebAssembly.

Source code for fractal is based on https://dev.to/brightdevs/using-webassembly-with-react-1led, and the repository templated by https://github.com/Fallenstedt/wasm-react-webpack-template.

## Notes

- WASM Build works pretty well with rust
- Rust is a solid option for getting webassembly integrated
- Golang was considered, but previous experiments weren't as desired
- Makefile as an entrypoint is preferrable than using `yarn ...`
- Embedding the generated packages within the front (e.g. under `pkg/`) allows for local refs
- When does the build perform certain targets? E.g. resolution of paths vs copying of static files?
- Searching for options of individual target execution didn't yield much (using wrong search terms?)
- Webpacks plugin model isn't really the desired execution model, prefer graph-driven like buck/bazel
- Webpack plugin dumping the files just by directory path isn't ideal, would prefer to ref (e.g. `//pkg/fractal`)
- Loading WebAssembly requires a bit of pre-amble, could probably be made into a `<project>-commons` for UIs responsible for loading it
- Usages of them are pretty nice, opportunities for generated API/Schemas/State Machines/State Models

I'm not sure on this one. I get the benefits that come with the webpack ecosystem, but had multiple issues with the way its goes about it in comparison to patterns like Bazel/Buck. I like this pattern more for combining various languages to create the final result, such as having a rust library for certain functions or components. Splitting it away from the frontend makes it so they can be designed in more of a "unit-test" way. Possible options might be to encode a state machine within one of these libraries, then have the web interface act on this, like a `View => ViewModel => {Model}` where the `ViewModel` performs queries into the state machine `{Model}`.
