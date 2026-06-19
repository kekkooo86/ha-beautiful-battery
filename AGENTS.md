# AGENTS.md — Beautiful Battery

## Project Overview

Home Assistant Lovelace custom card that renders a beautiful 3D battery visualization
with liquid glass effects, smooth animations, and a polished UI.

**Target:** A single battery entity card — not a multi-entity dashboard.
Think: elegant, detailed, visually stunning.

## Tech Stack

| Tool     | Version | Role                        |
|----------|---------|-----------------------------|
| Lit      | 3.2     | Web components framework    |
| TypeScript | 5.7   | Type checking               |
| Vite     | 6.x     | Bundler (ES2022 output)     |

No `custom-card-helpers` — we keep dependencies minimal.
No Rollup — Vite handles everything.

## Commands

```bash
npm run build        # Production build → dist/beautiful-battery.js
npm run dev          # Watch mode (rebuild on save)
npm run typecheck    # tsc --noEmit
```

## Project Structure

```
beautiful-battery/
├── src/
│   ├── index.ts                          # Entry point, customCards registration
│   ├── card/
│   │   └── beautiful-battery-card.ts     # Main LitElement card (437 lines)
│   ├── editor/
│   │   └── beautiful-battery-editor.ts   # Visual editor for HA UI
│   ├── types/
│   │   ├── hass.ts                       # HomeAssistant, HassEntity interfaces
│   │   └── config.ts                     # BatteryConfig interface
│   └── utils/                            # (empty, ready for helpers)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── hacs.json
```

## Key Files

### `src/types/config.ts` — Config Interface

All card options in `BatteryConfig`:
- `entity` — HA sensor entity ID (required)
- `theme` — `'liquid-glass'` (default) or `'solid'`
- `orientation` — `'vertical'` or `'horizontal'`
- `size` — `'small'` (120px), `'medium'` (180px), `'large'` (240px)
- `show_percentage`, `show_voltage`, `show_power`, `show_status` — toggles
- `charge_colors` — `{ low, mid, high, full }` hex colors for gradient
- `animation_speed` — multiplier (0–3)
- `glow_intensity` — 0–1

### `src/card/beautiful-battery-card.ts` — Main Card

Key architecture:
- `@customElement('beautiful-battery-card')` — registers the card
- `setConfig(config)` — called by HA with YAML config
- `render()` — Lit template with battery visual + info text
- `_syncState()` — reads entity state from `this.hass.states[entity]`
- `_wavePath(offset)` — generates SVG wave path for liquid animation

CSS effects (all in static `styles`):
- Liquid glass: `backdrop-filter: blur(20px)` + transparent gradient
- 3D float: `perspective: 800px` + `rotateX/Y` keyframe animation
- Charge fill: gradient bar with SVG animated wave on top
- Glow: blurred div that pulses during charging
- Specular highlight: `::after` pseudo-element with blur
- Surface reflection: `::before` gradient overlay

### `src/index.ts` — Entry Point

Registers the card in `window.customCards` for HA card picker.

## Default Config

```typescript
{
  type: 'custom:beautiful-battery',
  entity: '',
  theme: 'liquid-glass',
  orientation: 'vertical',
  show_percentage: true,
  show_voltage: false,
  show_power: false,
  show_status: true,
  charge_colors: {
    low: '#ff4444',
    mid: '#ffaa00',
    high: '#44cc44',
    full: '#00ddff',
  },
  size: 'medium',
  animation_speed: 1.2,
  glow_intensity: 0.8,
}
```

## Current State (v0.1.0)

### Done
- [x] Project scaffolding (Lit 3 + TS + Vite)
- [x] Basic card with liquid glass CSS
- [x] 3D floating animation
- [x] SVG liquid wave on charge surface
- [x] Dynamic color gradient (low → mid → high → full)
- [x] Glow effect (pulses when charging)
- [x] Charging detection (state or attribute)
- [x] Vertical + horizontal orientation
- [x] 3 sizes (small/medium/large)
- [x] Visual editor (entity picker, toggles, color pickers, sliders)
- [x] Typecheck + build pass
- [x] **3D rotation on mouse move** — pointer tracking, rotateX/Y based on cursor
- [x] **Charge level particles** — floating bubbles in liquid fill
- [x] **Tap actions** — more-info, toggle, call-service (default: more-info)
- [x] **Dark/light theme detection** — auto-adjust glass/text colors via hass.themes.darkMode
- [x] **Charge animation** — animated fill from 0 to current level on first load
- [x] **I18n** — Italian + English labels (charging, discharging, full, empty)
- [x] **Solid theme variant** — non-glass fallback for compatibility
- [x] **Drop animation** — discrete SVG drops: fall-in when charging, drain-out when discharging

### TODO — Next Session Priorities
- [ ] **Multi-cell battery mode** — show multiple cells side by side (e.g. 4-cell pack)
- [ ] **HA theme integration** — use `var(--primary-color)` etc.
- [ ] **Responsive sizing** — auto-scale based on card width
- [ ] **Editor polish** — call-service tap_action config fields, better entity search
- [ ] **Haptic feedback** — vibration on tap for mobile
- [ ] **Custom CSS variables** — expose accent color for dashboard integration

## Design Vision

The card should feel like a premium UI element — think Apple battery widget meets
iOS liquid glass design language. Key aesthetic principles:
- Depth through layered gradients and blur
- Subtle 3D perspective (never overwhelming)
- Color is information (charge level = color)
- Animation is feedback (charging = pulse, idle = gentle float)
- Glass transparency reveals the dashboard behind it

## HA Integration Notes

- Card type: `custom:beautiful-battery`
- Entity: typically `sensor.battery_level` or similar
- Attributes used: `voltage`, `power`, `battery_charging`
- State values: numeric (0-100) or `charging`/`discharging`/`full`/`unavailable`
- Build output: `dist/beautiful-battery.js` → copy to `<config>/www/`
- HACS compatible (hacs.json present)

## Conventions

- All CSS in static `styles` (no external stylesheets)
- Helper functions (`clamp`, `lerpColor`, `chargeColor`) at module top
- Config spread with defaults in `setConfig()`
- No comments in code (user preference)
- English code, Italian can be added via i18n later
