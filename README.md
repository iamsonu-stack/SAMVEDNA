# SAMVEDNA Prototype — TechTrack

This is the first manual-coding starter prototype.

## Apps
- `cctns-mock/` — mock CCTNS case system
- `samvedna/` — SAMVEDNA dashboard
- `backend/` — Node.js + Express API

## Current workflow
CCTNS Mock -> REST API -> SAMVEDNA

The backend currently uses in-memory mock data so the prototype can run without a database.
Supabase/PostgreSQL can be added in the next step.

## Run
Open three terminals.

### 1) Backend
```bash
cd backend
npm install
npm run dev
```

Backend: http://localhost:5000

### 2) CCTNS Mock
```bash
cd cctns-mock
npm install
npm run dev
```

### 3) SAMVEDNA
```bash
cd samvedna
npm install
npm run dev
```

Open the URLs printed by Vite.

## Demo
1. Open CCTNS Mock and view the cases.
2. Open SAMVEDNA.
3. Click "Fetch CCTNS Cases".
4. SAMVEDNA loads the cases from the Node/Express API.
