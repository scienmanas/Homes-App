# Homes App

A small Angular app for browsing housing listings (server-rendered + client). Includes components for home, details, and a simple housing service.

Tech stack

- Angular (TypeScript)
- Server-side entry (Universal/Express)

Quick start

1. Install dependencies

   npm install
2. Run the app (development)

   npm run dev
3. Run tests

   npm test

Repository layout

- `src/app/` — application code (components, services, routes)
- `src/main.ts`, `src/main.server.ts`, `server.ts` — client and server entry points

Start the mock api

- Navigate to the app folder and run

```bash
npx json-server db.json
```

Notes

- This README is intentionally concise. See `src/app` for components and `package.json` for available scripts.

License

- MIT
