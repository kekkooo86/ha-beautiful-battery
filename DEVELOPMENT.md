# Sviluppo in locale

## Workflow

### 1. Avvia il Dev Container

Apri il progetto in WebStorm → clicca destro su `.devcontainer/devcontainer.json` → **Create Dev Container and Mount Sources**

HA è su `http://localhost:8123` (login: `dev`/`dev`).

### 2. Avvia il server di sviluppo

Dal **terminale di WebStorm** (quello del Dev Container, non la finestra host):

```bash
npm run dev:remote
```

Rigenera `dist/beautiful-battery.js` ad ogni modifica e lo serve su `http://localhost:3000`.

### 3. Aggiungi la card in HA

1. Apri `http://localhost:8123`
2. Sidebar → **Panoramica** → **⋮** → **Modifica dashboard**
3. **➕ Aggiungi card** → cerca **"Beautiful Battery"**
4. Configura entità e salva

### 4. Ciclo di sviluppo

1. Modifichi il codice in `src/`
2. Vite rebuilda automaticamente (`dist/beautiful-battery.js`)
3. **F5** su HA → vedi i cambiamenti

---

## Riferimenti

| URL | Cosa |
|---|---|
| `http://localhost:8123` | Home Assistant (dev) |
| `http://localhost:3000/beautiful-battery.js` | Card servita da Vite |

## Comandi utili

```bash
npm run dev:remote        # build watch + server
npm run build             # build singola
npm run typecheck         # controllo tipi TypeScript
```

## Risoluzione problemi

**Card non trovata tra quelle disponibili:**
- Verifica che la risorsa sia in **Impostazioni → Lovelace dashboard → Risorse**
- URL deve essere `http://localhost:3000/beautiful-battery.js`, tipo `JavaScript Module`
- `Ctrl+Shift+R` per hard refresh

**Errore CORS / Connection Refused:**
- Verifica che `npm run dev:remote` sia in esecuzione
- `curl -sI http://localhost:3000/beautiful-battery.js` deve dare `200 OK` con header `access-control-allow-origin: *`

**Container resettato:** I dati HA sono in un volume Docker (`ha-beautiful-battery-config`), persistono tra ricreazioni.

## Note

- Non serve HACS — la card è caricata via risorsa locale
- WebStorm remoto (thin client) ha i plugin da reinstallare (TypeScript, lit, ecc.)
