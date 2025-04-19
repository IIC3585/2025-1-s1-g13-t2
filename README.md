# Setup
1.  [Install rust](https://doc.rust-lang.org/stable/book/ch01-01-installation.html)
2.  Check if you have cargo already installed: `cargo --version`

3. Install dependencies: `cargo install`

# Build proyect for WASM
Run this from `2025-1-s1-g13-t2/image_processing/`
- Just build rust binary:  `wasm-pack build --target web`
  
  **or**

- Build rust binary for test web app: `wasm-pack build --target web --out-dir ../web_for_rust_testing/pkg`

# Run test server

1. Run server: `bash web_for_rust_testing/serve.sh`
2. In another terminal run: `watchexec -e rs "wasm-pack build --target web --out-dir ../web_for_rust_testing/pkg"
`

This will update the web app automatically while you modify your rust code, instead of having to build for each change.


# Run wasm-image-pwa app

1. Run dev: `npm run dev`