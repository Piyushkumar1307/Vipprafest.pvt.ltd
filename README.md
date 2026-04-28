# VIPPRAFEST Website

A modern marketing website for **Vipprafest Pvt. Ltd.** built with **React + TypeScript + Vite + Tailwind** and a small **Express + Nodemailer** API for the enquiry/contact form.

## Tech stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router
- **UI/UX**: Framer Motion, Lucide Icons
- **Backend (API)**: Express, Zod validation, Nodemailer (SMTP)
- **Env**: dotenv

---

## Project structure
- `src/` — React app (pages, components, styles)
- `server/index.ts` — Express API (`/api/contact`, `/api/health`) + production static serving
- `server/dev-all.mjs` — runs frontend + API together in development
- `dist/` — production build output (generated)

---

## Getting started

### 1) Install
```bash
npm install