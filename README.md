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
├── node_modules         # Has "package.json" and "package-lock.json" to recreate 
├── output/              # Generated files (should be empty to start)
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

This is how your final stack should look like:
<img width="261" height="260" alt="image" src="https://github.com/user-attachments/assets/0f400ff0-7cdc-4e83-8fe0-254ab930eb50" />

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

Usage Screen Shots:
<img width="950" height="729" alt="Screenshot 2025-12-16 010817" src="https://github.com/user-attachments/assets/a0e8fb25-8023-43ae-b8b0-8ed52fd042d4" />
<img width="968" height="724" alt="Screenshot 2025-12-16 010846" src="https://github.com/user-attachments/assets/9604c4a9-35f1-42cf-a487-77e150b9fbb6" />
<img width="966" height="907" alt="Screenshot 2025-12-16 010859" src="https://github.com/user-attachments/assets/3d91a49a-7e7a-498d-a80f-071ae343a026" />
<img width="973" height="783" alt="Screenshot 2025-12-16 010920" src="https://github.com/user-attachments/assets/84aab48f-eea4-485a-b48a-8de43cf81791" />
<img width="981" height="834" alt="Screenshot 2025-12-16 010931" src="https://github.com/user-attachments/assets/db7273a0-7c0f-4207-ab50-798794092921" />
<img width="968" height="901" alt="Screenshot 2025-12-16 010942" src="https://github.com/user-attachments/assets/99fd3979-1c4c-491c-bd1a-01a25a8a0ea0" />

