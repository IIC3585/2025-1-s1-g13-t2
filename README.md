
# VITE Project # WASM Image PWA

## Clone the Repository

```bash
git clone <repo>
cd wasm-image-pwa
```

## Install Dependencies

```bash
npm install
```

## Rust Setup

1. **Install Rust**: Follow the official guide to install Rust: [Rust Installation Guide](https://doc.rust-lang.org/stable/book/ch01-01-installation.html)
2. **Check if Cargo is Installed**: Run `cargo --version` to check if Cargo (Rust's package manager and build system) is already installed.
3. **Install Rust Dependencies**: Inside your `rust/` directory, run:

```bash
cargo install
```

## Build Project for WASM

To build the Rust binary for WASM, run the following command from the `rust/` directory:

- **Just Build Rust Binary**:

```bash
wasm-pack build --target web
```

**OR**

<!-- - **Build Rust Binary for Web App Testing**:

```bash
wasm-pack build --target web --out-dir ../web_for_rust_testing/pkg
``` 

This will output the WASM build files into the `web_for_rust_testing/pkg` folder. -->

<!-- ## Run Test Server

1. Run the server:

```bash
bash web_for_rust_testing/serve.sh
```

2. In another terminal, automatically rebuild the WASM package when you modify the Rust code:

```bash
watchexec -e rs "wasm-pack build --target web --out-dir ../web_for_rust_testing/pkg"
```

This will automatically rebuild and update the web app while you modify your Rust code, without needing to rebuild manually each time. -->

## Build the Project

After setting up Rust and WASM, build the project:

```bash
cd rust
wasm-pack build --target web
cd ..
```

## Run the Project

Finally, to run the project:

```bash
npm run dev
```

This will start the development server for the PWA, and you can view the app in your browser.
