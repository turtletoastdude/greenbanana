# GreenBanana Wallet Generator (Main)

GreenBanana is an **offline, air-gapped wallet generator** built for secure cold‑storage workflows.

This project is designed to run **locally without an internet connection** and emphasizes transparency, minimal attack surface, and user‑controlled entropy.

---

## What This Does

- Mouse‑based entropy collection
- BIP39 mnemonic generation
- Deterministic key derivation
- Bitcoin & Dogecoin address + WIF generation
- QR code generation
- Paper wallet image overlay workflow
- Basic PSBT sweep creation & signing (Bitcoin)

No data is transmitted.  
No secrets are stored remotely.

---

## Project Structure

```
.
├── images/              # Paper wallet templates
├── lib/                 # Local crypto + QR libraries
├── output/              # Generated files (DO NOT COMMIT)
├── package.json
├── package-lock.json
└── wallet_generator_main
```

---

## About `node_modules`

You may notice that **`node_modules/` is not included in this repository**.

This is intentional and standard practice.

- `node_modules/` contains installed dependency files
- It can include **hundreds or thousands of files**
- It is automatically generated from `package.json` and `package-lock.json`
- Including it would bloat the repository and cause upload issues

Instead, this repo includes:
- `package.json` — declares required dependencies
- `package-lock.json` — locks exact dependency versions for reproducibility

### Recreating `node_modules`

On any machine (online once):

```bash
npm install
```

This will regenerate `node_modules/` exactly as intended.

After installation, the project can be run **fully offline**.

---

## How to Use

1. Install dependencies once:
   ```bash
   npm install
   ```
2. Disconnect from the internet.
3. Open `wallet_generator_main` in a browser  
   *(or serve locally if preferred)*

---

## Security Notes

- Never run this project on an internet‑connected machine after setup
- Never upload generated keys, mnemonics, or QR codes
- Verify source files before use
- Prefer a dedicated offline device (laptop or Raspberry Pi)

---

## Philosophy

> Security is a discipline, not a feature.

GreenBanana prioritizes **clarity, control, and reproducibility** over convenience.

---

## Disclaimer

This software is provided as‑is.  
You are responsible for verifying outputs and practicing proper operational security.

<img width="261" height="260" alt="image" src="https://github.com/user-attachments/assets/0f400ff0-7cdc-4e83-8fe0-254ab930eb50" />
