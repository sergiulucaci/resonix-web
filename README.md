# Resonix Web

Simple SPA frontend for Resonix briefings.

## Features

- Intro section explaining Resonix
- Topic selector
- Fetch latest briefing from backend for selected topic
- Render:
  - summary
  - bullet points
  - bottom line
  - source cards (`source logo`, `source title`, `article title`, `date`, `preview`)
- Remembers last selected topic in local storage

## Requirements

- Node 22+
- Resonix backend running (default expected at `http://localhost:3001`)

## Setup

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Tests

```bash
npm test
npm run lint
npm run build
```
# resonix-web
