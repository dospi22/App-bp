# Deploy su Vercel

## 1. Prepara il progetto

- Assicurati che il progetto sia su **GitHub**, **GitLab** o **Bitbucket** (Vercel si collega al repo).
- Se non l’hai ancora fatto: crea un repo, poi:
  ```bash
  git init
  git add .
  git commit -m "Deploy su Vercel"
  git remote add origin https://github.com/TUO-USER/TUO-REPO.git
  git push -u origin main
  ```

## 2. Crea il progetto su Vercel

1. Vai su [vercel.com](https://vercel.com) e accedi (o registrati).
2. Clicca **Add New** → **Project**.
3. Importa il repository del progetto (es. da GitHub).
4. **Non** cambiare i comandi di build: Vercel userà `vercel.json` (Build Command: `npm run build`, Output: `dist`).

## 3. Variabili d’ambiente (obbligatorie)

In **Project Settings** → **Environment Variables** aggiungi:

| Nome | Valore | Note |
|------|--------|------|
| `VITE_PERPLEXITY_API_KEY` | La tua chiave API Perplexity | Per la chat AI |
| `VITE_SUPABASE_URL` | `https://izosgofpzpwpkksmerea.supabase.co` | Per i progetti salvati |
| `VITE_SUPABASE_ANON_KEY` | La tua Anon Key Supabase (JWT) | Per i progetti salvati |

- Impostale per **Production** (e, se vuoi, anche Preview).
- **Non** mettere mai chiavi nel codice: solo nelle variabili d’ambiente.

## 4. Deploy

1. Clicca **Deploy**.
2. Attendi il build (1–2 minuti).
3. Vercel ti darà un URL tipo `https://tuo-progetto.vercel.app`.

## 5. Dopo il deploy

- **Chat:** le risposte passano dalla Serverless Function `/api/chat/completions` (proxy Perplexity).
- **Progetti:** vengono salvati su Supabase, quindi li vedi uguali su tutti i dispositivi e anche sul sito in produzione.
- **Routing:** tutte le route (es. `/chat`, `/business-plan`) funzionano grazie alle rewrite in `vercel.json`.

## Problemi comuni

- **Chat non risponde:** controlla che `VITE_PERPLEXITY_API_KEY` sia impostata in Vercel (e che la chiave sia valida).
- **Progetti non si vedono:** controlla `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` e che la tabella `projects` esista in Supabase (script in `supabase/migrations/001_create_projects.sql`).
- **404 su route:** verifica che in `vercel.json` ci sia la rewrite che manda tutto (tranne `/api/`) a `index.html`.
