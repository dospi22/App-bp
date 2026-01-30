# App Ricerca Bandi

Un'applicazione moderna per la ricerca e la gestione di bandi di gara pubblici e privati, con un'interfaccia dark theme ispirata a design moderni e professionali.

## Caratteristiche

- 🎨 **Interfaccia moderna** con tema scuro e accenti teal
- 🔍 **Ricerca avanzata** per bandi per parola chiave, settore, regione
- 📋 **Filtri per categoria** (Edilizia, Tecnologia, Sanità, Istruzione, Ambiente)
- 💾 **Salvataggio bandi** preferiti
- 📱 **Design responsive** per tutti i dispositivi

## Tecnologie Utilizzate

- React 18
- Vite
- Tailwind CSS
- React Hooks

## Installazione

1. Installa le dipendenze:
```bash
npm install
```

2. Avvia il server di sviluppo:
```bash
npm run dev
```

3. Apri il browser su `http://localhost:5173`

## Build per Produzione

```bash
npm run build
```

Il risultato sarà nella cartella `dist/`.

## Struttura del Progetto

```
src/
├── components/
│   ├── Header.jsx          # Header con navigazione
│   ├── Hero.jsx            # Hero section con barra di ricerca
│   ├── ContentSection.jsx  # Sezioni contenuto con filtri
│   └── BandiList.jsx       # Lista dei bandi con risultati
├── App.jsx                 # Componente principale
├── main.jsx                # Entry point
└── index.css               # Stili globali
```

## Funzionalità Future

- Integrazione con API reali per i bandi
- Autenticazione utente
- Notifiche per nuovi bandi
- Dashboard personalizzata
- Esportazione risultati
