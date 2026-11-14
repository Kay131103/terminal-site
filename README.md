# 🖥️ Terminal Portfolio

Your personal site as a fake shell: recruiters get a blinking prompt and a `help`
command instead of scrolling a template. Boot sequence, command history (↑/↓),
tab completion, easter eggs, three color themes. Nobody forgets it.

## Commands
`about` `skills` `projects` `contact` `resume` `ls` `cat <file>` `neofetch`
`theme green|purple|amber` `open github|linkedin|resume` `banner` `clear` …
and a few secrets (`sudo`, `rm -rf /`).

## Make it yours
Everything is in one file: **`src/config.js`** — name, role, links, skills,
projects. Drop your real resume into `public/resume.pdf` (create the folder)
so `open resume.pdf` works.

**Cost:** $0. Pure static site, no backend, no dependencies (Vite is dev-only).

## Dev
```bash
npm install
npm run dev      # → http://localhost:5173
```

## Build & deploy
```bash
npm run build    # → dist/
```
Cloudflare Pages: build command `npm run build`, output directory `dist`.
