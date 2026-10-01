# Fancy Calculator

A browser-based calculator for everyday arithmetic, with a light and dark theme.

![Deploy](https://github.com/MrDoodeth/fancy-calculator/actions/workflows/deploy.yml/badge.svg)
![MIT license](https://img.shields.io/badge/license-MIT-blue)

[Open the live calculator](https://mrdoodeth.github.io/fancy-calculator/)

## 📦 Features

- Add, subtract, multiply, and divide.
- Calculate remainders with `%` (not a percentage key).
- Enter decimal and negative numbers.
- Evaluate chained operations using standard arithmetic precedence.
- Reset with `CE` or remove the last character or operator with `C`.
- Switch between light and dark themes; the selection is saved in the browser.

## 🚀 Getting Started

**Requirements**

- Node.js 20.19+ (or 22.12+) and npm.
- A modern browser for the application.

**Installation**

```bash
git clone https://github.com/MrDoodeth/fancy-calculator.git
cd fancy-calculator
npm ci
```

**Quick Start**

```bash
npm run dev
```

Open the URL shown by Vite. With the default settings, it is:

```text
http://localhost:5000/fancy-calculator/
```

## ⚙️ Configuration

The app does not require environment variables. Its Vite settings are in
[`vite.config.js`](vite.config.js):

- Base path: `/fancy-calculator/` for GitHub Pages.
- Development server port: `5000`.
- Preview server port: `9999`.

If you deploy under a different path, update the Vite `base` setting.

## 🛠️ Usage

Use the on-screen buttons to enter an expression, then press `=`. For example:

```text
8 ÷ 2 × 2 = 8
```

Operations of equal precedence are evaluated from left to right. The `%` key
calculates the remainder; dividing by zero shows `Error`.

Run the calculation tests:

```bash
npm test
```

Build the static site and preview it locally:

```bash
npm run build
npm run preview
```

The production files are written to `dist/`. The project uses vanilla JavaScript,
SCSS, and Vite. GitHub Actions deploys the build to GitHub Pages from `main`.

## 🤝 Contributing

1. Fork the repository and create a branch for your change.
2. Make your change, then run `npm test` and `npm run build`.
3. Open a pull request with a short description of the change.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
